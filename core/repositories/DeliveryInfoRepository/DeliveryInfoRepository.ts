import {DeliveryInfo} from "../../domain/DeliveryInfo";
export interface DeliveryInfoRepository {
    create(
        statusId: string,
        shipmentId: string,
        location: string,
        statusDescription: string,
        timestamp: Date,
    ) : Promise<DeliveryInfo>,
    save(parcel: DeliveryInfo): Promise<DeliveryInfo>,
    getAll(): Promise<DeliveryInfo[]>,
    getById(orderId: string): Promise<DeliveryInfo | null>,
    delete(parcelId: string) : Promise<void>,
}