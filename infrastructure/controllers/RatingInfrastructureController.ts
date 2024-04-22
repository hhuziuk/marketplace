import { NextFunction, Request, Response } from "express";
import RatingInfrastructureService from "../services/RatingInfrastructureService";
import ApiError from "../exceptions/ApiError";

class RatingInfrastructureController {
    constructor(readonly ratingService: any = RatingInfrastructureService) {}

    /**
     * @swagger
     * /ratings/add:
     *   post:
     *     tags:
     *       - Ratings
     *     summary: Add a new rating
     *     description: Endpoint to add a new rating
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: ratingData
     *         description: Rating data to add a new rating
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             ratingValue:
     *               type: number
     *             comment:
     *               type: string
     *     responses:
     *       200:
     *         description: Rating added successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async addRating(req: Request, res: Response, next: NextFunction) {
        try {
            const { ratingValue, comment } = req.body;
            const rating = await RatingInfrastructureService.create({ ratingValue, comment });
            res.json(rating);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /ratings/update/{ratingId}:
     *   put:
     *     tags:
     *       - Ratings
     *     summary: Update rating
     *     description: Endpoint to update a rating
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: ratingId
     *         description: ID of the rating to update
     *         required: true
     *         type: string
     *       - in: body
     *         name: ratingData
     *         description: Updated rating data
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             ratingValue:
     *               type: number
     *             comment:
     *               type: string
     *     responses:
     *       200:
     *         description: Rating updated successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { ratingId } = req.params;
            const { updates } = req.body;
            const rating = await RatingInfrastructureService.update(ratingId, updates)
            if (!ratingId || !updates) {
                ApiError.BadRequest(`Required data is missing`);
            }
            return res.json(rating)
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /ratings:
     *   get:
     *     tags:
     *       - Ratings
     *     summary: Get all ratings
     *     description: Endpoint to retrieve all ratings
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns all ratings
     *       500:
     *         description: Internal server error
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const ratings = await RatingInfrastructureService.getAll();
            return res.json(ratings);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /ratings/{ratingId}:
     *   get:
     *     tags:
     *       - Ratings
     *     summary: Get rating by ID
     *     description: Endpoint to retrieve a rating by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: ratingId
     *         description: ID of the rating to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns the rating
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { ratingId } = req.params;
            if (!ratingId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const rating = await RatingInfrastructureService.getById(ratingId);
            return res.json(rating)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /ratings/{ratingId}:
     *   delete:
     *     tags:
     *       - Ratings
     *     summary: Delete rating
     *     description: Endpoint to delete a rating
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: ratingId
     *         description: ID of the rating to delete
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Rating deleted successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { ratingId } = req.params;
            if (!ratingId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const rating = await RatingInfrastructureService.delete(ratingId)
            return res.json(rating)
        } catch (e) {
            next(e);
        }
    }
}

export default new RatingInfrastructureController();
