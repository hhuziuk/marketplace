import { DeliveryStatus } from "./enums/DeliveryStatus";
import { ParcelStatus } from "./enums/ParcelStatus";

export class Parcel {
    constructor(
        readonly parcelId: string,
        readonly createdAt: Date,
        readonly senderUserId: string,
        readonly recipientUserId: string,
        readonly deliveryStatus: DeliveryStatus,
        readonly parcelStatus: ParcelStatus,
        readonly weight: number,
        readonly dimensions: ParcelDimensions,
        readonly deliveryAddress: string,
        readonly deliveryCost: number,
        readonly estimatedDeliveryDate: Date,
        readonly shippingMethod: ShippingMethod,
        readonly trackingNumber: string,
        readonly comments: string,
        readonly insuranceAmount: number,
        readonly customsDeclaration: CustomsDeclaration | null,
        readonly deliveryAttempts: number,
        readonly deliveryDriverId: string | null,
        readonly deliveryCompany: string | null,
        readonly deliveredAt: Date | null,
        readonly returnedAt: Date | null,
        readonly signatureImageURL: string | null,
        readonly cancellationReason: string | null,
    ) {}
}

export class ParcelDimensions {
    constructor(
        readonly length: number,
        readonly width: number,
        readonly height: number,
    ) {}
}

export class ShippingMethod {
    constructor(
        readonly name: string,
        readonly description: string,
    ) {}
}

export class CustomsDeclaration {
    constructor(
        readonly description: string,
        readonly value: number,
        readonly currency: string,
        readonly originCountry: string,
        readonly harmonizedCode: string,
    ) {}
}