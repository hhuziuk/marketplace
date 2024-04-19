import {NextFunction, Request, Response} from "express";
import FavoriteInfrastructureService from "../services/FavoriteInfrastructureService";
import ApiError from "../exceptions/ApiError";

class FavoriteInfrastructureController {
    constructor(readonly favoriteService: any = FavoriteInfrastructureService) {}
    async addToFavorite(req: Request, res: Response, next: NextFunction){
        try{
            const { userId, bookId } = req.body;
            if (!userId || !bookId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            if (!bookId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const favorite = await FavoriteInfrastructureService.addToFavorite(userId, bookId)
            return res.json(favorite)
        } catch(e){
            next(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const favorites = await FavoriteInfrastructureService.getAll();
            return res.json(favorites);
        } catch(e) {
            next(e);
        }
    }
    async deleteFromFavorite(req: Request, res: Response, next: NextFunction){
        try{
            const {bookId} = req.params;
            console.log(bookId)
            if (!bookId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const favorite = await FavoriteInfrastructureService.deleteFromFavorite(bookId)
            return res.json(favorite)
        } catch(e){
            next(e);
        }
    }
}
export default new FavoriteInfrastructureController();