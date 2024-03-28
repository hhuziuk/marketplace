import express from "express";
require('dotenv').config();
import cors from "cors";
import logger from "./tools/logger";
import router from "./infrastructure/routers";
import cookieParser from "cookie-parser"
import passport from "passport"
import RedisStore from "connect-redis";
import redisClient from "./tools/RedisConnect";
import session from "express-session"
import {PostgresDataSource} from "./tools/PostgresConnection";
const PORT : string | number = process.env.PORT || 3015;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', router);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    store: new RedisStore({ client: redisClient }),
    name: 'sessioncookie',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 10
    }
}));


const start = async() => {
    try{
        await redisClient.connect().then(() => console.log('Redis Connected...'))
        await PostgresDataSource.initialize()
            .then(() => logger.info('Postgres Connected...'))
            .catch((error) => console.log(error))
        app.listen(PORT, () => {logger.info(`app is running on ${PORT} port`)})
    } catch(e){
        logger.error(e)
    }
}
start();