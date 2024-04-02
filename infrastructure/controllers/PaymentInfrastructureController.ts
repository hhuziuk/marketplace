import logger from "../../tools/logger";
import {Response, Request, NextFunction} from "express";
import PaymentInfrastructureService from "../services/PaymentInfrastructureService";
import ApiError from "../exceptions/ApiError";
class PaymentInfrastructureController {
    constructor(readonly paymentService: any = PaymentInfrastructureService) {}
    async setPaymentMethod(req: Request, res: Response, next: NextFunction) {
        try {
            const { paymentId, method } = req.body;
            if (!paymentId || !method) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            await this.paymentService.setPaymentMethod(paymentId, method);
            return res.json({ message: "Payment method updated successfully" });
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const payments = await PaymentInfrastructureService.getAll();
            return res.json(payments);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
    async updatePaymentMethod(req: Request, res: Response, next: NextFunction) {
        try {
            const { paymentId, method } = req.body;
            if (!paymentId || !method) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            await this.paymentService.updatePaymentMethod(paymentId, method);
            return res.json({ message: "Payment method updated successfully" });
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
    async payByCard(req: Request, res: Response, next: NextFunction) {
        try {
            const { amount, cardNumber } = req.body;
            if (!amount || !cardNumber) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            await this.paymentService.payByCard(amount, cardNumber);
            return res.json({ message: "Payment successful" });
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
}
export default new PaymentInfrastructureController();