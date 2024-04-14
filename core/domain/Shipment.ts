import {ParcelStatus} from "./enums/ParcelStatus";

export class Shipment {
    constructor(
        readonly shipmentId: string,
        readonly orderId: string,
        readonly userId: string,
        readonly trackingNumber: string,
        readonly carrier: string,
        readonly service: string,
        readonly shipmentStatus: ParcelStatus,
        readonly estimatedDeliveryDate: Date,
        readonly addressFrom: string,
        readonly addressTo: string,
    ) {}
}