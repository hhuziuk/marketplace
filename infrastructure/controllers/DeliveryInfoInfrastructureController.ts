import logger from "../../tools/logger";
import {NextFunction, Request, Response} from "express";
import DeliveryInfoInfrastructureService from "../services/CategoryInfrastructureService";
import ApiError from "../exceptions/ApiError";
class DeliveryInfoInfrastructureController {
    constructor(readonly deliveryInfoService: any = DeliveryInfoInfrastructureService) {}
    async create(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){
            next(e);
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e) {
            next(e);
            logger.error(e)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){
            next(e)
            logger.error(e)
        }
    }
    async getByName(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){
            next(e)
            logger.error(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try{

        } catch(e){
            next(e);
            logger.error(e)
        }
    }
}

export default new DeliveryInfoInfrastructureController();