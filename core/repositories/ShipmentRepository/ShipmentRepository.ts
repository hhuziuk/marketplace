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
    save(shipment: Shipment): Promise<Shipment>,
    update(shipmentId: string): Promise<Shipment>,
    getAll(): Promise<Shipment[]>,
    getById(shipmentId: string): Promise<Shipment | null>,
    delete(shipmentId: string) : Promise<void>,
}