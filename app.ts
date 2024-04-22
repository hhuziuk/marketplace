import express from "express";

require('dotenv').config();
import cors from "cors";
import logger from "./tools/logger";
import router from "./infrastructure/routers";
import cookieParser from "cookie-parser"
import https from 'https';
import passport from "passport"
import RedisStore from "connect-redis";
import redisClient from "./tools/RedisConnect";
import session from "express-session"
import {PostgresDataSource} from "./tools/PostgresConnection";
import {setupSwagger} from "./tools/swagger";
import * as fs from "node:fs";

const PORT: string | number = process.env.PORT || 3000;
const app = express();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
app.use(session({
    store: new RedisStore({client: redisClient}),
    name: 'sessioncookie',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 10
    }
}));

setupSwagger(app);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');
const options = {
    key: key,
    cert: cert
};

const start = async () => {
    try {
        const server = https.createServer(options, app);
        await redisClient.connect()
        await PostgresDataSource.initialize()
            .then(() => logger.info('Postgres Connected...'))
            .catch((error) => console.log(error))
        server.listen(PORT, () => {
            logger.info(`app is running on ${PORT} port`)
        })
    } catch (e) {
        logger.error(e)
    }
}
start();