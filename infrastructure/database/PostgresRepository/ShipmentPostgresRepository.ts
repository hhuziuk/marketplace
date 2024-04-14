import {DeleteResult} from "typeorm";
import {Shipment} from "../PostgresEntities/ShipmentEntity";
import {PostgresDataSource} from "../../../tools/PostgresConnection";

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
    async getBy(data: object): Promise<Shipment> {
        return await PostgresDataSource.getRepository(Shipment).findOne({where: data});
    }
    async delete(shipmentId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Shipment).delete(shipmentId);
    }
}

export default new ShipmentPostgresRepository()