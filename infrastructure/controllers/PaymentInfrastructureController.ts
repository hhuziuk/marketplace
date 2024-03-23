import logger from "../../tools/logger";
import {NextFunction} from "express";
class PaymentInfrastructureController {
    constructor(readonly paymentService: any = PaymentInfrastructureService) {}
    async setPaymentMethod(req: Request, res: Response, next: NextFunction){
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
    async updatePaymentMethod(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
}
export default new PaymentInfrastructureController();