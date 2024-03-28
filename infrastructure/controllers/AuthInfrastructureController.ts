import AuthInfrastructureService from "../services/AuthInfrastructureService";
import logger from "../../tools/logger";
import {Response, Request, NextFunction} from "express";

class AuthInfrastructureController {
    constructor(readonly authService: any = AuthInfrastructureService) {}

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, username, password, role } = req.body;
            const userData = await AuthInfrastructureService.registration(email, username, password, role);

            if (UserService.cookiesEnabled) {
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
            if(UserService.cookiesEnabled) {
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
            if(UserService.cookiesEnabled) {
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
            if(UserService.cookiesEnabled) {
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            }
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
}

export default new AuthInfrastructureController();