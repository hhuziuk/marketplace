import {Response, Request, NextFunction} from "express";
import WishlistInfrastructureService from "../services/WishlistInfrastructureService";
import ApiError from "../exceptions/ApiError";

class WishlistInfrastructureController {
    /**
     * @swagger
     * /wishlist/add:
     *   post:
     *     tags:
     *       - Wishlist
     *     summary: Add book to wishlist
     *     description: Endpoint to add a book to the wishlist
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: bookId
     *         description: The ID of the book to add to the wishlist
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             bookId:
     *               type: string
     *     responses:
     *       200:
     *         description: Book added to wishlist successfully
     *       400:
     *         description: Bad request
     *       404:
     *         description: Not found
     *       409:
     *         description: Conflict
     */
    async addToWishList(req: Request, res: Response, next: NextFunction) {
        try {
            const {bookId} = req.body;
            const bookInWishlist = await WishlistInfrastructureService.addToWishList(bookId);
            res.json(bookInWishlist);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /wishlist:
     *   get:
     *     tags:
     *       - Wishlist
     *     summary: Get all books in wishlist
     *     description: Endpoint to retrieve all books in the wishlist
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns all books in the wishlist
     *       400:
     *         description: Bad request
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const booksInWishlist = await WishlistInfrastructureService.getAll();
            return res.json(booksInWishlist);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /wishlist/delete:
     *   delete:
     *     tags:
     *       - Wishlist
     *     summary: Clean wishlist
     *     description: Endpoint to delete all books from the wishlist
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Wishlist cleaned successfully
     *       400:
     *         description: Bad request
     *       404:
     *         description: Not found
     */
    async cleanWishList(req: Request, res: Response, next: NextFunction) {
        try {
            const booksInWishlist = await WishlistInfrastructureService.cleanWishList();
            return res.json(booksInWishlist);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /wishlist/delete/{bookId}:
     *   delete:
     *     tags:
     *       - Wishlist
     *     summary: Delete book from wishlist
     *     description: Endpoint to delete a book from the wishlist by book ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: bookId
     *         description: The ID of the book to delete from the wishlist
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Book deleted from wishlist successfully
     *       400:
     *         description: Bad request
     *       404:
     *         description: Not found
     */
    async deleteFromWishList(req: Request, res: Response, next: NextFunction) {
        try {
            const {bookId} = req.params;
            if (!bookId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const bookInWishlist = await WishlistInfrastructureService.deleteFromWishList(bookId);
            return res.json(bookInWishlist);
        } catch (e) {
            next(e);
        }
    }
}

export default new WishlistInfrastructureController();
