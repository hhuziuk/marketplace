import logger from "../../tools/logger";
import {NextFunction, Request, Response} from "express";
import CategoryInfrastructureService from "../services/CategoryInfrastructureService";
import ApiError from "../exceptions/ApiError";
class CategoryInfrastructureController {
    constructor(readonly categoryService: any = CategoryInfrastructureService) {}
    async addCategory(req: Request, res: Response, next: NextFunction){
        try{
            const {category} = req.body
            if (!category) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const type = await CategoryInfrastructureService.addCategory(category)
            return res.json(type)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        try{
            const {categoryId, categoryName} = req.body;
            const category = await CategoryInfrastructureService.update(categoryId, categoryName)
            if (!categoryId || !categoryName) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            return res.json(category)
        } catch(e){
            next(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const category = await CategoryInfrastructureService.getAll();
            return res.json(category);
        } catch(e) {
            next(e);
        }
    }
    async getById(req: Request, res: Response, next: NextFunction){
        try{
            const {categoryId} = req.params;
            if (!categoryId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const category = await CategoryInfrastructureService.getById(categoryId);
            return res.json(category)
        } catch(e){
            next(e)
        }
    }
    async getByName(req: Request, res: Response, next: NextFunction){
        try{
            const {categoryName} = req.params;
            if (!categoryName) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const category = await CategoryInfrastructureService.getByName(categoryName);
            return res.json(category)
        } catch(e){
            next(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try{
            const {categoryId} = req.body;
            if (!categoryId) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            const category = await CategoryInfrastructureService.delete(categoryId)
            return res.json(category)
        } catch(e){
            next(e);
        }
    }
}

export default new CategoryInfrastructureController();