import logger from "../../tools/logger";
import {NextFunction, Request, Response} from "express";
import RatingInfrastructureService from "../services/RatingInfrastructureService";
import ApiError from "../exceptions/ApiError";
import BookInfrastructureService from "../services/BookInfrastructureService";
class RatingInfrastructureController {
    constructor(readonly ratingService: any = RatingInfrastructureService) {}
    async addRating(req: Request, res: Response, next: NextFunction) {
        try {
            const { ratingValue, comment } = req.body;
            const rating = await RatingInfrastructureService.create({ ratingValue, comment });
            res.json(rating);
        } catch (e) {
            next(e);
            logger.error(e)
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        try{
            const {ratingId, updates} = req.body;
            const rating = await RatingInfrastructureService.update(ratingId, updates)
            if (!ratingId || !updates) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            return res.json(rating)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const ratings = await RatingInfrastructureService.getAll();
            return res.json(ratings);
        } catch(e) {
            next(e);
            logger.error(e)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction){
        try{
            const {ratingId} = req.params;
            if (!ratingId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const rating = await RatingInfrastructureService.getById(ratingId);
            return res.json(rating)
        } catch(e){
            next(e)
            logger.error(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {ratingId} = req.body;
            if (!ratingId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const rating = await RatingInfrastructureService.delete(ratingId)
            return res.json(rating)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
}
export default new RatingInfrastructureController();