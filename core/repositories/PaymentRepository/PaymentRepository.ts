export interface PaymentRepository {
    //впідорити сюди enum з методами
    addPaymentMethod(method: any): Promise<void>
}