import UserInfrastructureService from "../services/UserInfrastructureService";
import logger from "../../tools/logger";
import {Response, Request, NextFunction} from "express";
import ApiError from "../exceptions/ApiError";
import {Role} from "../../core/domain/enums/Role";
class UserInfrastructureController {
    constructor(readonly userService: any = UserInfrastructureService) {}
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const users = await UserInfrastructureService.getAll();
            return res.json(users);
        } catch(e){
            next(e);
        }
    }
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const { username, name, surname, email, password, activationLink, phoneNumber, country, city, postalCode, address, role } = req.body;
            if (!(role in Role)) {
                throw ApiError.BadRequest("Invalid role provided");
            }
            const user = await this.userService.create(username, name, surname, email, password, activationLink, phoneNumber, country, city, postalCode, address, role);
            return res.status(201).json(user);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async getById(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            const user = await this.userService.getById(userId);
            if (!user) {
                throw ApiError.NotFound("Admin not found");
            }
            return res.json(user);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            const userData = req.body;
            const updatedUser = await this.userService.update(userId, userData);
            return res.json(updatedUser);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            await this.userService.delete(userId);
            return res.status(204).send();
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async verifySeller(req: Request, res: Response, next: NextFunction) {
        try {
            const sellerId = req.params.id;
            await this.userService.verifySeller(sellerId);
            return res.status(200).send("Seller verified successfully");
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
}
export default new UserInfrastructureController();