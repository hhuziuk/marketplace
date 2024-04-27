import client from "prom-client";
import express from "express";
import ApiError from "../exceptions/ApiError";
const router = express.Router();

router.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        res.end(await client.register.metrics());
    } catch (error) {
        console.error('Error generating metrics:', error);
        ApiError.BadRequest('Internal Server Error');
    }
});

export default router;