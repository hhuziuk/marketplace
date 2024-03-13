import {PaymentMethod} from "../../domain/enums/PaymentMethod";

export interface PaymentRepository {
    //впідорити сюди enum з методами
    addPaymentMethod(method: PaymentMethod): Promise<void>
}