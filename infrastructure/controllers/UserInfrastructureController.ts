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
            if (!Object.values(Role).includes(role)) {
                throw ApiError.BadRequest("Invalid role provided");
            }
            const user = await UserInfrastructureService.create(username, name, surname, email, password, activationLink, phoneNumber, country, city, postalCode, address, role);
            return res.json(user);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async getById(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params;
            const user = await UserInfrastructureService.getById(id);
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
            const {id} = req.params;
            const userData = req.body;
            const updatedUser = await UserInfrastructureService.update(id, userData);
            return res.json(updatedUser);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params;
            await UserInfrastructureService.delete(id);
            return res.status(204).send();
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async verifySeller(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const verifiedUser = await UserInfrastructureService.verifySeller(id);
            return res.status(200).send(verifiedUser);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
}
export default new UserInfrastructureController();