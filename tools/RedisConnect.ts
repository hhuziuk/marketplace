import {createClient} from "redis";
const redisURL: any = process.env.REDIS_URL;
const redisClient = createClient({url: redisURL})
export default redisClient;