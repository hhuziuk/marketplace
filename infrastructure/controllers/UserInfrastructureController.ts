import UserInfrastructureService from "../services/UserInfrastructureService";
import logger from "../../tools/logger";
import {Response, Request, NextFunction} from "express";
import ApiError from "../exceptions/ApiError";
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
    // Methods for Admin
    async createAdmin(req: Request, res: Response, next: NextFunction){
        try{
            const { username, name, surname, email, password, activationLink, phoneNumber, country, city, postalCode, address, role } = req.body;
            const admin = await this.userService.create(username, name, surname, email, password, activationLink, phoneNumber, country, city, postalCode, address, role);
            return res.status(201).json(admin);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async getByIdAdmin(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            const admin = await this.userService.getById(userId);
            if (!admin) {
                throw ApiError.NotFound("Admin not found");
            }
            return res.json(admin);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async updateAdmin(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            const userData = req.body;
            const updatedAdmin = await this.userService.update(userId, userData);
            return res.json(updatedAdmin);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async deleteAdmin(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            await this.userService.delete(userId);
            return res.status(204).send();
        } catch(e){
            next(e);
            logger.error(e);
        }
    }


    // Methods for Seller
    async createSeller(req: Request, res: Response, next: NextFunction){
        try{
            const { username, name, surname, email, password, activationLink, phoneNumber, country, city, postalCode, address, role } = req.body;
            const seller = await this.userService.create(username, name, surname, email, password, activationLink, phoneNumber, country, city, postalCode, address, role);
            return res.status(201).json(seller);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async getByIdSeller(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            const seller = await this.userService.getById(userId);
            if (!seller) {
                throw ApiError.NotFound("Seller not found");
            }
            return res.json(seller);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async updateSeller(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            const userData = req.body;
            const updatedSeller = await this.userService.update(userId, userData);
            return res.json(updatedSeller);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async deleteSeller(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            await this.userService.delete(userId);
            return res.status(204).send();
        } catch(e){
            next(e);
            logger.error(e);
        }
    }

    // Methods for Customer
    async createCustomer(req: Request, res: Response, next: NextFunction){
        try{
            const { username, name, surname, email, password, activationLink, phoneNumber, country, city, postalCode, address, role } = req.body;
            const customer = await this.userService.create(username, name, surname, email, password, activationLink, phoneNumber, country, city, postalCode, address, role);
            return res.status(201).json(customer);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async getByIdCustomer(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            const customer = await this.userService.getById(userId);
            if (!customer) {
                throw ApiError.NotFound("Customer not found");
            }
            return res.json(customer);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async updateCustomer(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            const userData = req.body;
            const updatedCustomer = await this.userService.update(userId, userData);
            return res.json(updatedCustomer);
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
    async deleteCustomer(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.id;
            await this.userService.delete(userId);
            return res.status(204).send();
        } catch(e){
            next(e);
            logger.error(e);
        }
    }
}
export default new UserInfrastructureController();