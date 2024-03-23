import logger from "../../tools/logger";
import {NextFunction} from "express";
class WishlistInfrastructureController {
    constructor(readonly wishlistService: any = WishlistInfrastructureService) {}
    async addToWishList(req: Request, res: Response, next: NextFunction){
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
    async cleanWishList(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
}
export default new WishlistInfrastructureController();