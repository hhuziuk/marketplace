import {DeleteResult} from "typeorm";
import {Shipment} from "../PostgresEntities/ShipmentEntity";
import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {ParcelStatus} from "../../../core/domain/enums/ParcelStatus";

class ShipmentPostgresRepository {
    async create(shipment: Shipment) {
        return await PostgresDataSource.getRepository(Shipment).create(shipment);
    }
    async save(shipment: Shipment): Promise<Shipment> {
        return await PostgresDataSource.getRepository(Shipment).save(shipment);
    }
    async getAll(): Promise<Shipment[]> {
        return await PostgresDataSource.getRepository(Shipment).find();
    }
    async getById(shipmentId: string): Promise<Shipment> {
        return await PostgresDataSource.getRepository(Shipment).findOne({where: {shipmentId}});
    }
    async getByCarrier(carrier: string): Promise<Shipment[]> {
        return await PostgresDataSource.getRepository(Shipment).find({where: {carrier}});
    }
    async getByTrackingNumber(trackingNumber: string): Promise<Shipment> {
        return await PostgresDataSource.getRepository(Shipment).findOne({where: {trackingNumber}});
    }
    async getByStatus(shipmentStatus: ParcelStatus): Promise<Shipment[]> {
        return await PostgresDataSource.getRepository(Shipment).find({ where: { shipmentStatus } });
    }
    async getByDate(estimatedDeliveryDate: Date): Promise<Shipment[]> {
        return await PostgresDataSource.getRepository(Shipment).find({ where: { estimatedDeliveryDate } });
    }
    async getBy(data: object): Promise<Shipment[]> {
        return await PostgresDataSource.getRepository(Shipment).find({where: data});
    }
    async delete(shipmentId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Shipment).delete(shipmentId);
    }
}

export default new ShipmentPostgresRepository()