import logger from "../../tools/logger";
import {Response, Request, NextFunction} from "express";
import WishlistInfrastructureService from "../services/WishlistInfrastructureService";
import ApiError from "../exceptions/ApiError";
class WishlistInfrastructureController {
    constructor(readonly wishlistService: any = WishlistInfrastructureService) {}
    async addToWishList(req: Request, res: Response, next: NextFunction) {
        try {
            const { bookId } = req.body;
            const bookInWishlist = await this.wishlistService.addToWishList(bookId);
            res.json(bookInWishlist);
        } catch (e) {
            next(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const booksInWishlist = await this.wishlistService.getAll();
            return res.json(booksInWishlist);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
    async deleteFromWishList(req: Request, res: Response, next: NextFunction) {
        try {
            const { bookId } = req.params;
            if (!bookId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const bookInWishlist = await this.wishlistService.deleteFromWishList(bookId)
            return res.json(bookInWishlist)
        } catch(e) {
            next(e);
            logger.error(e);
        }
    }
    async cleanWishList(req: Request, res: Response, next: NextFunction) {
        try {
            const booksInWishlist = await this.wishlistService.cleanWishList();
            return res.json(booksInWishlist);
        } catch(e) {
            next(e);
            logger.error(e);
        }
    }
}
export default new WishlistInfrastructureController();