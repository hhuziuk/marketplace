import {PaymentDomainService} from "../../core/services/PaymentDomainService";
import {Payment} from "../database/PostgresEntities/PaymentEntity";
import {DeleteResult} from "typeorm";
import ApiError from "../exceptions/ApiError";

export class PaymentInfrastructureService {
    constructor(readonly paymentRepository: any = new PaymentDomainService(paymentRepository)){}
    async create(payment: Payment) {
        const userPayment = await this.paymentRepository.create(payment)
        await this.paymentRepository.save(userPayment)
        return userPayment;
    }
    async getAll(): Promise<Payment[]> {
        const payments = await this.paymentRepository.getAll();
        return payments;
    }
    async getById(paymentId: string): Promise<Payment> {
        if (!paymentId) {
            throw ApiError.BadRequest(`No id was provided`);
        }
        const payment = await this.paymentRepository.getById(paymentId);
        if (!payment) {
            throw ApiError.BadRequest(`Payment with id ${paymentId} not found`);
        }
        return payment;
    }
    async delete(paymentId: string): Promise<DeleteResult> {
        if (!paymentId) {
            throw ApiError.BadRequest(`No id was provided`);
        }
        return await this.paymentRepository.delete(paymentId);
    }
}