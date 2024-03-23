import {AuthInfrastructureService} from "../services/AuthInfrastructureService";
import logger from "../../tools/logger";
import {NextFunction} from "express";

class AuthInfrastructureController {
    constructor(readonly authService: any = AuthInfrastructureService) {}

    async registration(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction){
        try{

            return res.json()
        } catch(e){
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction){
        try{
        } catch(e){
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){
            next(e);
        }
    }
}

export default new AuthInfrastructureController();