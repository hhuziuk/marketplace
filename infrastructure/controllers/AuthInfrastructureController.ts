import AuthInfrastructureService from "../services/AuthInfrastructureService";
import logger from "../../tools/logger";
import {Response, Request, NextFunction} from "express";
import {Role} from "../../core/domain/enums/Role";
import UserInfrastructureController from "./UserInfrastructureController";

class AuthInfrastructureController {
    constructor(readonly authService: any = AuthInfrastructureService) {}
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, username, password, role } = req.body;
            let user;

            switch (role) {
                case Role.Admin:
                    user = await UserInfrastructureController.createAdmin(req, res, next);
                    break;
                case Role.Seller:
                    user = await UserInfrastructureController.createSeller(req, res, next);
                    break;
                case Role.Customer:
                    user = await UserInfrastructureController.createCustomer(req, res, next);
                    break;
                default:
                    throw new Error('Invalid role provided');
            }

            const userData = await AuthInfrastructureService.registration(email, username, password, user);

            if (AuthInfrastructureService.cookiesEnabled) {
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            } else {
                req.session.user = { ...userData };
            }

            return res.json(userData);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
    async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body
            const userData = await AuthInfrastructureService.login(email, password)
            if(AuthInfrastructureService.cookiesEnabled) {
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            } else {
                req.session.user = {...userData};
            }
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        try{
            const {email} = req.body;
            const userData = AuthInfrastructureService.logout(email)
            if(AuthInfrastructureService.cookiesEnabled) {
                res.clearCookie('userData')
            } else {
                await req.session.destroy((err) => {
                    if (err) {
                        res.clearCookie('sessioncookie')
                        logger.error(err);
                    }
                })
            }
            return res.json(userData)
        } catch(e){
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction){
        try{
            const activationLink = req.params.link;
            await AuthInfrastructureService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || '')
        } catch(e){
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = req.cookies
            const userData = await AuthInfrastructureService.refresh(refreshToken)
            if(AuthInfrastructureService.cookiesEnabled) {
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            }
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
}

export default new AuthInfrastructureController();