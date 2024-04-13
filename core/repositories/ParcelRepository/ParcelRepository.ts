import {Parcel} from "../../domain/Parcel";
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
    getAll(): Promise<Parcel[]>,
    getById(orderId: string): Promise<Parcel | null>,
    delete(parcelId: string) : Promise<void>,
}