import {PaymentMethod} from "../../domain/enums/PaymentMethod";
import {Payment} from "../../domain/Payment";

export interface PaymentRepository {
    setPaymentMethod(method: PaymentMethod): Promise<void>,

    getAll(): Promise<Payment>,

    updatePaymentMethod(method: PaymentMethod): Promise<void>,
}