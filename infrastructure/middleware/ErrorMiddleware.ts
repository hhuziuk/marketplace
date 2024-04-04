// import {Response, Request, NextFunction} from "express";
// import ApiError from "../exceptions/ApiError";
// import logger from "../../tools/logger";
//
// export default function (error: Error, req: Request, res: Response, next: NextFunction)  {
//     if (error instanceof ApiError) {
//         return res.status(error.status).json({message: error.message, errors: error.errors})
//         logger.error(error)
//     }
//     return res.status(500).json({ message: 'unexpected error' });
//     logger.error(error)
// }