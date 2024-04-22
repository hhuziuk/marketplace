import { NextFunction, Request, Response } from "express";
import PublisherInfrastructureService from "../services/PublisherInfrastructureService";
import ApiError from "../exceptions/ApiError";

class PublisherInfrastructureController {
    constructor(readonly publisherService: any = PublisherInfrastructureService) {}

    /**
     * @swagger
     * /publishers/add:
     *   post:
     *     tags:
     *       - Publishers
     *     summary: Add a new publisher
     *     description: Endpoint to add a new publisher
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: publisherData
     *         description: Publisher data to add a new publisher
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             publisher:
     *               type: string
     *     responses:
     *       200:
     *         description: Publisher added successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async addPublisher(req: Request, res: Response, next: NextFunction) {
        try {
            const { publisher } = req.body
            if (!publisher) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const publisherData = await PublisherInfrastructureService.create(publisher)
            return res.json(publisherData)
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /publishers:
     *   get:
     *     tags:
     *       - Publishers
     *     summary: Get all publishers
     *     description: Endpoint to retrieve all publishers
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns all publishers
     *       500:
     *         description: Internal server error
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const publishers = await PublisherInfrastructureService.getAll();
            return res.json(publishers);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /publishers/{publisherId}:
     *   get:
     *     tags:
     *       - Publishers
     *     summary: Get publisher by ID
     *     description: Endpoint to retrieve a publisher by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: publisherId
     *         description: ID of the publisher to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns the publisher
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { publisherId } = req.params;
            if (!publisherId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const publisher = await PublisherInfrastructureService.getById(publisherId);
            return res.json(publisher)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /publishers/name/{publisherName}:
     *   get:
     *     tags:
     *       - Publishers
     *     summary: Get publisher by name
     *     description: Endpoint to retrieve a publisher by name
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: publisherName
     *         description: Name of the publisher to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns the publisher
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async getByName(req: Request, res: Response, next: NextFunction) {
        try {
            const { publisherName } = req.params;
            if (!publisherName) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const publisher = await PublisherInfrastructureService.getByName(publisherName);
            return res.json(publisher)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /publishers/{publisherId}:
     *   put:
     *     tags:
     *       - Publishers
     *     summary: Update publisher
     *     description: Endpoint to update a publisher
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: publisherId
     *         description: ID of the publisher to update
     *         required: true
     *         type: string
     *       - in: body
     *         name: publisherData
     *         description: Updated publisher data
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             publisherName:
     *               type: string
     *     responses:
     *       200:
     *         description: Publisher updated successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { publisherId } = req.params;
            const { publisherName } = req.body;
            const publisher = await PublisherInfrastructureService.update(publisherId, publisherName)
            if (!publisherId || !publisherName) {
                ApiError.BadRequest(`Required data is missing`);
            }
            return res.json(publisher)
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /publishers/{publisherId}:
     *   delete:
     *     tags:
     *       - Publishers
     *     summary: Delete publisher
     *     description: Endpoint to delete a publisher
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: publisherId
     *         description: ID of the publisher to delete
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Publisher deleted successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { publisherId } = req.params;
            if (!publisherId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const publisher = await PublisherInfrastructureService.delete(publisherId)
            return res.json(publisher)
        } catch (e) {
            next(e);
        }
    }
}

export default new PublisherInfrastructureController();
