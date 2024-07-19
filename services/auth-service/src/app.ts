import express from 'express';
import session from 'express-session';
import passport from 'passport';
import authRoutes from '../src/routes/authRoutes';
import { localStrategy } from '../src/strategies/localStrategy';
import { googleStrategy } from '../src/strategies/googleStrategies';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import { findUserById } from '../../db/entity';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3000', // Change this to your client URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Use CORS middleware

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // Session expires after 24 hours
    },
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(googleStrategy);
passport.use(localStrategy);

passport.serializeUser((user: any, done) => {
    done(null, user.id); // Ensure the first argument is null for no error
});

passport.deserializeUser(async (id: string, done) => {
    const user = await findUserById(id); // Use your DB function to find the user
    console.log('Deserialized User:', user); // Log the deserialized user
    done(null, user); // Attach user object to req.user
});

setupSwagger(app);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
