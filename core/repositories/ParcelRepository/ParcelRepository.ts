import {CustomsDeclaration, Parcel, ParcelDimensions, ShippingMethod} from "../../domain/Parcel";
import {ParcelStatus} from "../../domain/enums/ParcelStatus";
import {DeliveryStatus} from "../../domain/enums/DeliveryStatus";


export interface ParcelRepository {
    createParcel(
        parcelId: string,
        createdAt: Date,
        senderUserId: string,
        recipientUserId: string,
        deliveryStatus: DeliveryStatus,
        parcelStatus: ParcelStatus,
        weight: number,
        dimensions: ParcelDimensions,
        deliveryAddress: string,
        deliveryCost: number,
        estimatedDeliveryDate: Date,
        shippingMethod: ShippingMethod,
        trackingNumber: string,
        comments: string,
        insuranceAmount: number,
        customsDeclaration: CustomsDeclaration | null,
        deliveryAttempts: number,
        deliveryDriverId: string | null,
        deliveryCompany: string | null,
        deliveredAt: Date | null,
        returnedAt: Date | null,
        signatureImageURL: string | null,
        cancellationReason: string | null,
    ) : Promise<Parcel>,
    save(parcel: Parcel): Promise<Parcel>,
    getAll(): Promise<Parcel[]>,
    getById(orderId: string): Promise<Parcel | null>,
    confirmParcel(orderId: string) : Promise<Parcel>,
    cancelParcel(parcelId: string) : Promise<void>,
    setParcelStatus(status: ParcelStatus) : Promise<void>,
    setDeliveryStatus(status: ParcelStatus) : Promise<void>,
}