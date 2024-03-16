import {PaymentMethod} from "../../domain/enums/PaymentMethod";

export interface PaymentRepository {
    addPaymentMethod(method: PaymentMethod): Promise<void>
}