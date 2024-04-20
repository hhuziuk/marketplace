import logger from "../../tools/logger";
import {Response, Request, NextFunction} from "express";
import PaymentInfrastructureService from "../services/PaymentInfrastructureService";
import ApiError from "../exceptions/ApiError";
import {PaymentMethod} from "../../core/domain/enums/PaymentMethod";

class PaymentInfrastructureController {
    constructor(readonly paymentService: any = PaymentInfrastructureService) {}

    async setPaymentMethod(req: Request, res: Response, next: NextFunction) {
        try {
            const { method, amount, cardNumber, paymentMethodId, userId, orderId } = req.body;
            if (!amount || !method || (!cardNumber && !paymentMethodId)) {
                throw ApiError.BadRequest(`Required data is missing`);
            }

            let paymentId;
            if (method === PaymentMethod.CreditCard || method === PaymentMethod.DebitCard) {
                if (!amount || !cardNumber) {
                    throw ApiError.BadRequest(`Required data is missing`);
                }

                paymentId = await PaymentInfrastructureService.createAndProcessPayment(amount, method, paymentMethodId, userId, orderId);
            } else {
                paymentId = req.body.id;
            }
            await PaymentInfrastructureService.setPaymentMethod(paymentId, method);

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
            const {paymentId} = req.params;
            const { method } = req.body;
            if (!paymentId || !method) {
                throw ApiError.BadRequest(`Required data is missing`);
            }
            await PaymentInfrastructureService.updatePaymentMethod(paymentId, method);
            return res.json({ message: "Payment method updated successfully" });
        } catch (e) {
            next(e);
            logger.error(e);
        }
    }
}

export default new PaymentInfrastructureController();
