import express from "express"
require('dotenv').config()
import logger from "./tools/logger";

const PORT = process.env.PORT || 3015;
const app = express();


app.use(express.json())
//app.use('/api', router)

const start = async() => {
    try{

        app.listen(PORT, () => {logger.info(`app is running on ${PORT} port`)})
    } catch(e){
        logger.error(e)
    }
}
start();