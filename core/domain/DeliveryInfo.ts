export class DeliveryInfo {
    constructor(
        readonly deliveryInfoId: string,
        readonly shipmentId: string,
        readonly location: string,
        readonly statusDescription: string,
        readonly timestamp: Date,
    ) {}
}
