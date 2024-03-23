import logger from "../../tools/logger";
import {NextFunction} from "express";

class PaymentInfrastructureController {
    constructor(readonly paymentService: any = PaymentInfrastructureService) {}
    async createOrder(req: Request, res: Response, next: NextFunction){
        try{
            return res.json()
        } catch(e){
            next(e);
            logger.error(e)
        }
    }

}

export default new PaymentInfrastructureController();