export interface PaymentRepository {
    payByCard(data: any): Promise<void>
}