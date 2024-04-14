import EasyPostClient from '@easypost/api/src/easypost';
import ShipmentPostgresRepository from "../database/PostgresRepository/ShipmentPostgresRepository";
import {ShipmentDomainService} from "../../core/services/ShipmentDomainService";
import {Shipment} from "../database/PostgresEntities/ShipmentEntity";
import {ParcelStatus} from "../../core/domain/enums/ParcelStatus";
import ApiError from "../exceptions/ApiError";

class ShipmentInfrastructureService {

    constructor(readonly shipmentRepository: any = new ShipmentDomainService(shipmentRepository)) {}
    private client = new EasyPostClient(process.env.EASYPOST_API_KEY);

    async create(shipmentData: Shipment): Promise<Shipment> {
        const trackingInfo = await this.client.shipment.createShipment(shipmentData);
        return  await ShipmentPostgresRepository.create({ ...shipmentData, ...trackingInfo });
    }

    async update(shipmentId: string, shipmentData: any): Promise<Shipment> {
        const shipment = await this.shipmentRepository.getById(shipmentId);
        if (!shipment) {
                throw ApiError.BadRequest(`Shipment with id ${shipmentId} not found`);
        }
        const trackingInfo = await this.client.shipment.updateShipment(shipmentId, shipmentData);
        await ShipmentPostgresRepository.save({ ...shipmentData, ...trackingInfo });
        return shipment;
    }

    async getAll(): Promise<Shipment[]> {
        return await ShipmentPostgresRepository.getAll();
    }

    async getById(shipmentId: string): Promise<Shipment> {
        return await ShipmentPostgresRepository.getById(shipmentId);
    }

    async getByCarrier(carrier: string): Promise<Shipment[]> {
        return await ShipmentPostgresRepository.getByCarrier(carrier);
    }

    async getByTrackingNumber(trackingNumber: string): Promise<Shipment> {
        return await ShipmentPostgresRepository.getByTrackingNumber(trackingNumber);
    }

    async getByStatus(status: ParcelStatus): Promise<Shipment[]> {
        return await ShipmentPostgresRepository.getByStatus(status);
    }

    async getByDate(estimatedDeliveryDate: Date): Promise<Shipment[]> {
        return await ShipmentPostgresRepository.getByDate(estimatedDeliveryDate);
    }
    async delete(shipmentId: string): Promise<void> {
        await ShipmentPostgresRepository.delete(shipmentId);
    }
}
export default new ShipmentInfrastructureService(ShipmentPostgresRepository);
