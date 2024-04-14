import {ShipmentRepository} from "../repositories/ShipmentRepository/ShipmentRepository";
import {Shipment} from "../domain/Shipment";
import {ParcelStatus} from "../domain/enums/ParcelStatus";

export class ShipmentDomainService implements ShipmentRepository{
    constructor(private shipmentDomainRepository: ShipmentRepository) {}
    async create(
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
    ): Promise<Shipment> {
        return await this.shipmentDomainRepository.create(
            shipmentId,
            orderId,
            userId,
            trackingNumber,
            carrier,
            service,
            shipmentStatus,
            estimatedDeliveryDate,
            addressFrom,
            addressTo
        );
    }
    async save(shipment: Shipment): Promise<Shipment> {
        return await this.shipmentDomainRepository.save(shipment);
    }
    async update(shipmentId: string): Promise<Shipment> {
        return await this.shipmentDomainRepository.update(shipmentId);
    }
    async getAll(): Promise<Shipment[]> {
        return await this.shipmentDomainRepository.getAll();
    }
    async getById(shipmentId: string): Promise<Shipment | null> {
        return await this.shipmentDomainRepository.getById(shipmentId);
    }
    async delete(shipmentId: string): Promise<void> {
        return await this.shipmentDomainRepository.delete(shipmentId);
    }
}
