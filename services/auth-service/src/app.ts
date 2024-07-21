// services/auth-service/src/app.ts

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/authRoutes';
import cookieParser from "cookie-parser";
import { localStrategy } from '../src/strategies/localStrategy';
// import { googleStrategy } from './strategies/googleStrategies';
import dotenv from 'dotenv';
import cors from 'cors';
// import { findUserById } from './db/auth_entity';
import { setupSwagger } from './swagger';
import { googleStrategy } from '../src/strategies/googleStrategies';
import { findUserById } from '../src/db/auth_entity';
import { connectRabbitMQ } from '../../rabbitmq/rabbitmq';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    // origin: 'http://localhost:3000',
    // credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    const user = await findUserById(id);
    done(null, user);
});
connectRabbitMQ();

setupSwagger(app);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api-docs`);
});
