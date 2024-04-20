import {PaymentDomainService} from "../../core/services/PaymentDomainService";
import {Payment} from "../database/PostgresEntities/PaymentEntity";
import ApiError from "../exceptions/ApiError";
import { v4 as uuidv4 } from 'uuid';
import PaymentPostgresRepository from "../database/PostgresRepository/PaymentPostgresRepository";
import {PaymentMethod} from "../../core/domain/enums/PaymentMethod";
import Stripe from 'stripe';
import OrderInfrastructureService from "./OrderInfrastructureService";
import UserInfrastructureService from "./UserInfrastructureService";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

class PaymentInfrastructureService {
    constructor(readonly paymentRepository: any = new PaymentDomainService(paymentRepository)){}

    async createPayment(amount: number, method: PaymentMethod, userId: string, orderId: string): Promise<void> {
        try {
            const orderExists = await OrderInfrastructureService.getById(orderId);
            const userExists = await UserInfrastructureService.getById(userId);

            if (!orderExists || !userExists) {
                throw ApiError.NotFound(`Order or User not found`);
            }

            const newPayment: Payment = {
                createdAt: new Date(),
                totalPrice: amount,
                method: method,
                paymentId: uuidv4(),
                user: userExists.userId,
                order: orderExists.orderId,
            };
            await this.paymentRepository.save(newPayment);
            await OrderInfrastructureService.updateOrderPaymentStatus(orderId, newPayment.paymentId);

        } catch (error) {
            console.error('Error creating payment:', error);
            throw ApiError.InternalServerError('Error creating payment');
        }
    }

    async createAndProcessPayment(amount: number, method: PaymentMethod, paymentMethodId: string, userId: string, orderId: string): Promise<void> {
        try {
            let paymentId;
            switch (method) {
                case PaymentMethod.CreditCard:
                case PaymentMethod.DebitCard:
                    paymentId = await this.payByCard(amount, paymentMethodId);
                    break;
                case PaymentMethod.PayPal:
                    // TODO
                    break;
                case PaymentMethod.BankTransfer:
                    // TODO
                    break;
                default:
                    throw ApiError.BadRequest(`Payment method ${method} is not supported`);
            }

            await this.createPayment(amount, method, userId, orderId);
        } catch (error) {
            console.error('Error processing payment:', error);
            throw ApiError.InternalServerError('Error processing payment');
        }
    }

    async setPaymentMethod(paymentId: string, method: PaymentMethod): Promise<void> {
        const payment = await this.paymentRepository.getById(paymentId);
        if (!payment) {
            throw ApiError.BadRequest(`Payment with id ${paymentId} not found`);
        }
        payment.method = method;
        await this.paymentRepository.save(payment);
    }

    async getAll(): Promise<Payment[]> {
        return await this.paymentRepository.getAll();
    }

    async getById(paymentId: string): Promise<Payment | null> {
        return await this.paymentRepository.getById(paymentId);
    }

    async updatePaymentMethod(paymentId: string, method: PaymentMethod): Promise<void> {
        const payment = await this.paymentRepository.getById(paymentId);
        if (!payment) {
            throw ApiError.BadRequest(`Payment with id ${paymentId} not found`);
        }
        await this.setPaymentMethod(paymentId, method);
    }

    async payByCard(amount: number, paymentMethodId: string): Promise<string> {
        try {
            const amountInCents = Math.round(amount * 100);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amountInCents,
                currency: 'usd',
                payment_method: paymentMethodId,
                confirm: true,
                return_url: process.env.API_URL,
                payment_method_types: ['card'],
            });
            console.log('Payment successful:', paymentIntent);
            return paymentIntent.id;
        } catch (error) {
            console.error('Error processing payment:', error);
            throw ApiError.InternalServerError('Error processing payment');
        }
    }

}

export default new PaymentInfrastructureService(PaymentPostgresRepository);