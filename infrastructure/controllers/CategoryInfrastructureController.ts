import {NextFunction, Request, Response} from "express";
import CategoryInfrastructureService from "../services/CategoryInfrastructureService";
import ApiError from "../exceptions/ApiError";

class CategoryInfrastructureController {
    constructor(readonly categoryService: any = CategoryInfrastructureService) {
    }

    /**
     * @swagger
     * /categories/add:
     *   post:
     *     tags:
     *       - Categories
     *     summary: Add a new category
     *     description: Endpoint to add a new category
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Category object that needs to be added
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             category:
     *               type: string
     *     responses:
     *       200:
     *         description: Category added successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async addCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const {category} = req.body
            if (!category) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const type = await CategoryInfrastructureService.addCategory(category)
            return res.json(type)
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /categories/update/{categoryId}:
     *   put:
     *     tags:
     *       - Categories
     *     summary: Update a category
     *     description: Endpoint to update a category by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: categoryId
     *         description: ID of the category to update
     *         required: true
     *         type: string
     *       - in: body
     *         name: body
     *         description: Category object with updated data
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             category:
     *               type: string
     *     responses:
     *       200:
     *         description: Category updated successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {categoryId} = req.params;
            const {category} = req.body;
            const updatedCategory = await CategoryInfrastructureService.update(categoryId, category)
            if (!categoryId || !updatedCategory) {
                ApiError.BadRequest(`Required data is missing`);
            }
            return res.json(category)
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /categories:
     *   get:
     *     tags:
     *       - Categories
     *     summary: Get all categories
     *     description: Endpoint to retrieve all categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns all categories
     *       500:
     *         description: Internal server error
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await CategoryInfrastructureService.getAll();
            return res.json(category);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /categories/{categoryId}:
     *   get:
     *     tags:
     *       - Categories
     *     summary: Get category by ID
     *     description: Endpoint to retrieve a category by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: categoryId
     *         description: ID of the category to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns a category
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const {categoryId} = req.params;
            if (!categoryId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const category = await CategoryInfrastructureService.getById(categoryId);
            return res.json(category)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /categories/name/{categoryName}:
     *   get:
     *     tags:
     *       - Categories
     *     summary: Get category by name
     *     description: Endpoint to retrieve a category by name
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: categoryName
     *         description: Name of the category to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns a category
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async getByName(req: Request, res: Response, next: NextFunction) {
        try {
            const {categoryName} = req.params;
            if (!categoryName) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const category = await CategoryInfrastructureService.getByName(categoryName);
            return res.json(category)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /categories/delete/{categoryId}:
     *   delete:
     *     tags:
     *       - Categories
     *     summary: Delete a category
     *     description: Endpoint to delete a category by ID
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: categoryId
     *         description: ID of the category to delete
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Category deleted successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {categoryId} = req.params;
            if (!categoryId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const category = await CategoryInfrastructureService.delete(categoryId)
            return res.json(category)
        } catch (e) {
            next(e);
        }
    }
}

export default new CategoryInfrastructureController();
