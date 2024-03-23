import {AuthInfrastructureService} from "../services/AuthInfrastructureService";
import logger from "../../tools/logger";
import {NextFunction} from "express";

class BookInfrastructureController {
    constructor(readonly bookService: any = BookInfrastructureService) {}

    async create(req: Request, res: Response, next: NextFunction){
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
    async save(req: Request, res: Response, next: NextFunction){
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
    async getByAuthor(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
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
}

export default new BookInfrastructureController();