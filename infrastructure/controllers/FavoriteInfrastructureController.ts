import {NextFunction, Request, Response} from "express";
import FavoriteInfrastructureService from "../services/FavoriteInfrastructureService";
import ApiError from "../exceptions/ApiError";

class FavoriteInfrastructureController {
    constructor(readonly favoriteService: any = FavoriteInfrastructureService) {
    }

    /**
     * @swagger
     * /favorites/add:
     *   post:
     *     tags:
     *       - Favorites
     *     summary: Add a book to favorites
     *     description: Endpoint to add a book to favorites
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: body
     *         description: User ID and Book ID to add to favorites
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             userId:
     *               type: string
     *             bookId:
     *               type: string
     *     responses:
     *       200:
     *         description: Book added to favorites successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async addToFavorite(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId, bookId} = req.body;
            if (!userId || !bookId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const favorite = await FavoriteInfrastructureService.addToFavorite(userId, bookId)
            return res.json(favorite)
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /favorites/all:
     *   get:
     *     tags:
     *       - Favorites
     *     summary: Get all favorite books
     *     description: Endpoint to retrieve all favorite books
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns all favorite books
     *       500:
     *         description: Internal server error
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const favorites = await FavoriteInfrastructureService.getAll();
            return res.json(favorites);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /favorites/delete/{bookId}:
     *   delete:
     *     tags:
     *       - Favorites
     *     summary: Remove a book from favorites
     *     description: Endpoint to remove a book from favorites by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: bookId
     *         description: ID of the book to remove from favorites
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Book removed from favorites successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async deleteFromFavorite(req: Request, res: Response, next: NextFunction) {
        try {
            const {bookId} = req.params;
            if (!bookId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const favorite = await FavoriteInfrastructureService.deleteFromFavorite(bookId)
            return res.json(favorite)
        } catch (e) {
            next(e);
        }
    }
}

export default new FavoriteInfrastructureController();
