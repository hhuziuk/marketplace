import {Shipment} from "../../domain/Shipment";
import {ParcelStatus} from "../../domain/enums/ParcelStatus";
export interface ShipmentRepository {
    create(
        shipmentId: string,
        orderId: string,
        userId: string,
        trackingNumber: string,
        carrier: string,
        service: string,
        shipmentStatus: ParcelStatus,
        estimatedDeliveryDate: Date,
        addressFrom: string,
        addressTo: string,
    ) : Promise<Shipment>,
    save(parcel: Shipment): Promise<Shipment>,
    getAll(): Promise<Shipment[]>,
    getById(orderId: string): Promise<Shipment | null>,
    delete(parcelId: string) : Promise<void>,
}