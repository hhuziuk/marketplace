import {DeliveryInfo} from "../../domain/DeliveryInfo";
export interface DeliveryInfoRepository {
    create(
        deliveryInfoId: string,
        shipmentId: string,
        location: string,
        statusDescription: string,
        timestamp: Date,
    ) : Promise<DeliveryInfo>,
    save(parcel: DeliveryInfo): Promise<DeliveryInfo>,
    getAll(): Promise<DeliveryInfo[]>,
    update(deliveryInfoId: string): Promise<DeliveryInfo>,
    getById(deliveryInfoId: string): Promise<DeliveryInfo | null>,
    delete(deliveryInfoId: string) : Promise<void>,
}