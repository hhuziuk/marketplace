export class Payment {
    constructor(
        readonly paymentId: string,
        readonly date: Date,
        readonly customerId: string,
        readonly amount: number,
    ) {
    }
}