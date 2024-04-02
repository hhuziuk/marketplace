import {PaymentDomainService} from "../../core/services/PaymentDomainService";
import {Payment} from "../database/PostgresEntities/PaymentEntity";
import ApiError from "../exceptions/ApiError";
import PaymentPostgresRepository from "../database/PostgresRepository/PaymentPostgresRepository";
import {PaymentMethod} from "../../core/domain/enums/PaymentMethod";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});
class PaymentInfrastructureService {
    constructor(readonly paymentRepository: any = new PaymentDomainService(paymentRepository)){}
    async setPaymentMethod(paymentId: string, method: PaymentMethod): Promise<void> {
        const payment = await this.paymentRepository.getById(paymentId);
        if (!payment) {
            throw ApiError.BadRequest(`Payment with id ${paymentId} not found`);
        }
        payment.method = method;
        await this.paymentRepository.save(payment);
    }
    async getAll(): Promise<Payment> {
        return this.paymentRepository.getAll();
    }
    async updatePaymentMethod(paymentId: string, method: PaymentMethod): Promise<void> {
        const payment = await this.paymentRepository.getById(paymentId);
        if (!payment) {
            throw ApiError.BadRequest(`Payment with id ${paymentId} not found`);
        }
        await this.setPaymentMethod(paymentId, method);
    }
    async payByCard(amount: number, cardNumber: string): Promise<void> {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method: cardNumber,
                confirm: true,
                payment_method_options: {
                    card: {
                        installments: {
                            enabled: true,
                        },
                    },
                },
            });
            console.log('Payment successful:', paymentIntent);
        } catch (error) {
            console.error('Error processing payment:', error);
            throw ApiError.InternalServerError('Error processing payment');
        }
    }
}
export default new PaymentInfrastructureService(PaymentPostgresRepository);