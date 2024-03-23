import logger from "../../tools/logger";
import {NextFunction} from "express";

class CategoryInfrastructureController {
    constructor(readonly categoryService: any = CategoryInfrastructureService) {}

    async addCategory(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async save(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
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
    async getById(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async getByName(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json()
        } catch (e) {
            next(e);
            logger.error(e)
        }
    }
}

export default new CategoryInfrastructureController();