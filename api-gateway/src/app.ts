import express from 'express';
import authRoutes from './routes/index';
import session from 'express-session';
import passport from 'passport';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});