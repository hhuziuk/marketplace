import {Parcel} from "../../domain/Parcel";
import {DeliveryInfo} from "../../domain/DeliveryInfo";
export interface ParcelRepository {
    create(
        parcelId: string,
        shipmentId: number,
        userId: number,
        weight: number,
        length: number,
        width: number,
        height: number,
    ) : Promise<Parcel>,
    save(parcel: Parcel): Promise<Parcel>,
    update(parcelId: string): Promise<Parcel>,
    getAll(): Promise<Parcel[]>,
    getById(parcelId: string): Promise<Parcel | null>,
    delete(parcelId: string) : Promise<void>,
}