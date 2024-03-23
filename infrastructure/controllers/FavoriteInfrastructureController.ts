import logger from "../../tools/logger";
import {NextFunction} from "express";
import {FavoriteInfrastructureService} from "../services/FavoriteInfrastructureService";

class FavoriteInfrastructureController {
    constructor(readonly favoriteService: any = FavoriteInfrastructureService) {}
    async addToFavorite(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async deleteFromFavorite(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
}

export default new FavoriteInfrastructureController();