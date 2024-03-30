import {PaymentDomainService} from "../../core/services/PaymentDomainService";
import {Payment} from "../database/PostgresEntities/PaymentEntity";
import ApiError from "../exceptions/ApiError";
import PaymentPostgresRepository from "../database/PostgresRepository/PaymentPostgresRepository";
import {PaymentMethod} from "../../core/domain/enums/PaymentMethod";
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
}
export default new PaymentInfrastructureService(PaymentPostgresRepository);