export class DeliveryInfo {
    constructor(
        readonly statusId: string,
        readonly shipmentId: string,
        readonly location: string,
        readonly statusDescription: string,
        readonly timestamp: Date,
    ) {}
}
