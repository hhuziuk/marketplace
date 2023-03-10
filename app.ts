import express from "express";
require('dotenv').config();
import cors from "cors";
import logger from "./tools/logger";
import router from "./infrastructure/routers";
import cookieParser from "cookie-parser"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import {PostgresDataSource} from "./tools/PostgresConnection";
import {User} from "./infrastructure/database/PostgresEntities/UserEntity";
const PORT = process.env.PORT || 3015;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(cookieParser());
app.use(require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// app.use(session({
//     name: 'sessioncookie',
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false,
//         httpOnly: true,
//         maxAge: 1000 * 60 * 10
//     }
// }));

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3014/auth/google/callback",
//     passReqToCallback: true,
// }, userRouter));

const start = async() => {
    try{
        await PostgresDataSource.initialize()
            .then(() => logger.info('Postgres Connected...'))
            .catch((error) => console.log(error))
        app.listen(PORT, () => {logger.info(`app is running on ${PORT} port`)})
    } catch(e){
        logger.error(e)
    }
}
start();