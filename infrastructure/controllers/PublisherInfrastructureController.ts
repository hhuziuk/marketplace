import logger from "../../tools/logger";
import {NextFunction, Request, Response} from "express";
import PublisherInfrastructureService from "../services/PublisherInfrastructureService";
import ApiError from "../exceptions/ApiError";
class PublisherInfrastructureController {
    constructor(readonly publisherService: any = PublisherInfrastructureService) {}
    async addPublisher(req: Request, res: Response, next: NextFunction){
        try{
            const {publisher} = req.body
            if (!publisher) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const publisherData = await PublisherInfrastructureService.create(publisher)
            return res.json(publisherData)
        } catch(e){
            next(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const publishers = await PublisherInfrastructureService.getAll();
            return res.json(publishers);
        } catch(e) {
            next(e);
            logger.error(e)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction){
        try{
            const {publisherId} = req.params;
            if (!publisherId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const publisher = await PublisherInfrastructureService.getById(publisherId);
            return res.json(publisher)
        } catch(e){
            next(e)
            logger.error(e)
        }
    }
    async getByName(req: Request, res: Response, next: NextFunction){
        try{
            const {publisherName} = req.params;
            if (!publisherName) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const publisher = await PublisherInfrastructureService.getByName(publisherName);
            return res.json(publisher)
        } catch(e){
            next(e)
            logger.error(e)
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        try{
            const {publisherId, publisherName} = req.body;
            const publisher = await PublisherInfrastructureService.update(publisherId, publisherName)
            if (!publisherId || !publisherName) {
                ApiError.BadRequest(`Required data is missing`);
            }
            return res.json(publisher)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {publisherId} = req.body;
            if (!publisherId) {
                ApiError.BadRequest(`Required data is missing`);
            }
            const publisher = await PublisherInfrastructureService.delete(publisherId)
            return res.json(publisher)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
}
export default new PublisherInfrastructureController();