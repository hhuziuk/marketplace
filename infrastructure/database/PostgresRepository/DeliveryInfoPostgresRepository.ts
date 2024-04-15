import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {DeliveryInfo} from "../PostgresEntities/DeliveryInfoEntity";

class DeliveryInfoPostgresRepository {
    async create(deliveryInfo: DeliveryInfo) {
        return await PostgresDataSource.getRepository(DeliveryInfo).create(deliveryInfo);
    }
    async save(deliveryInfo: DeliveryInfo): Promise<DeliveryInfo> {
        return await PostgresDataSource.getRepository(DeliveryInfo).save(deliveryInfo);
    }
    async getAll(): Promise<DeliveryInfo[]> {
        return await PostgresDataSource.getRepository(DeliveryInfo).find();
    }
    async getById(deliveryInfoId: string): Promise<DeliveryInfo> {
        return await PostgresDataSource.getRepository(DeliveryInfo).findOne({where: {deliveryInfoId}});
    }
    async getBy(data: object): Promise<DeliveryInfo> {
        return await PostgresDataSource.getRepository(DeliveryInfo).findOne({where: data});
    }
    async delete(deliveryInfoId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(DeliveryInfo).delete(deliveryInfoId);
    }
}

export default new DeliveryInfoPostgresRepository()