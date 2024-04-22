import {PaymentRepository} from "../repositories/PaymentRepository/PaymentRepository";
import {PaymentMethod} from "../domain/enums/PaymentMethod";
import {Payment} from "../domain/Payment";

export class PaymentDomainService implements PaymentRepository {
    constructor(private paymentDomainRepository: PaymentRepository) {
    }

    async setPaymentMethod(method: PaymentMethod): Promise<void> {
        return await this.paymentDomainRepository.setPaymentMethod(method);
    }

    async getAll(): Promise<Payment> {
        return await this.paymentDomainRepository.getAll();
    }

    async updatePaymentMethod(method: PaymentMethod): Promise<void> {
        return await this.paymentDomainRepository.updatePaymentMethod(method);
    }
}