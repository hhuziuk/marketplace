import {PaymentDomainService} from "../../core/services/PaymentDomainService";

export class PaymentInfrastructureService {
    constructor(readonly paymentRepository: any = new PaymentDomainService(paymentRepository)){}

}