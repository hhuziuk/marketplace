import { Response, Request, NextFunction } from "express";
import PaymentInfrastructureService from "../services/PaymentInfrastructureService";
import ApiError from "../exceptions/ApiError";
import { PaymentMethod } from "../../core/domain/enums/PaymentMethod";

class PaymentInfrastructureController {
    constructor(readonly paymentService: any = PaymentInfrastructureService) {}

    /**
     * @swagger
     * /payments/set:
     *   post:
     *     tags:
     *       - Payments
     *     summary: Set payment method
     *     description: Endpoint to set payment method for an order
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: paymentData
     *         description: Payment data to set payment method
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             method:
     *               type: string
     *             amount:
     *               type: number
     *             cardNumber:
     *               type: string
     *             paymentMethodId:
     *               type: string
     *             userId:
     *               type: string
     *             orderId:
     *               type: string
     *     responses:
     *       200:
     *         description: Payment method updated successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async setPaymentMethod(req: Request, res: Response, next: NextFunction) {
        try {
            const { method, amount, cardNumber, paymentMethodId, userId, orderId } = req.body;
            if (!amount || !method || (!cardNumber && !paymentMethodId)) {
                ApiError.BadRequest(`Required data is missing`);
            }

            let paymentId;
            if (method === PaymentMethod.CreditCard || method === PaymentMethod.DebitCard) {
                if (!amount || !cardNumber) {
                    ApiError.BadRequest(`Required data is missing`);
                }

                paymentId = await PaymentInfrastructureService.createAndProcessPayment(amount, method, paymentMethodId, userId, orderId);
            } else {
                paymentId = req.body.id;
            }
            await PaymentInfrastructureService.setPaymentMethod(paymentId, method);

            return res.json({ message: "Payment method updated successfully" });
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /payments/all:
     *   get:
     *     tags:
     *       - Payments
     *     summary: Get all payments
     *     description: Endpoint to retrieve all payments
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns all payments
     *       500:
     *         description: Internal server error
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const payments = await PaymentInfrastructureService.getAll();
            return res.json(payments);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /payments/update/{paymentId}:
     *   put:
     *     tags:
     *       - Payments
     *     summary: Update payment method
     *     description: Endpoint to update payment method for a payment
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: paymentId
     *         description: ID of the payment to update
     *         required: true
     *         type: string
     *       - in: body
     *         name: paymentData
     *         description: New payment method for the payment
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             method:
     *               type: string
     *     responses:
     *       200:
     *         description: Payment method updated successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async updatePaymentMethod(req: Request, res: Response, next: NextFunction) {
        try {
            const { paymentId } = req.params;
            const { method } = req.body;
            if (!paymentId || !method) {
                ApiError.BadRequest(`Required data is missing`);
            }
            await PaymentInfrastructureService.updatePaymentMethod(paymentId, method);
            return res.json({ message: "Payment method updated successfully" });
        } catch (e) {
            next(e);
        }
    }
}

export default new PaymentInfrastructureController();
