import {counter, histogram} from "../../app";
import {NextFunction, Request, Response} from "express";

export const observeDuration = (req: Request, res: Response, next: NextFunction) => {
    counter.inc();
    const endTimer = histogram.startTimer();
    res.on('finish', () => {
        endTimer();
    });
    next();
};