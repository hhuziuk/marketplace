import {PaymentRepository} from "../repositories/PaymentRepository/PaymentRepository";
import {PaymentMethod} from "../domain/enums/PaymentMethod";

export class PaymentDomainService implements PaymentRepository {
    constructor(private paymentDomainRepository: PaymentRepository){}
    async addPaymentMethod(method: PaymentMethod): Promise<void> {
        return await this.paymentDomainRepository.addPaymentMethod(method);
    }
}