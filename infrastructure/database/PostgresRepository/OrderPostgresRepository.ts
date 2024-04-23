import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {Order} from "../PostgresEntities/OrderEntity";

class OrderPostgresRepository {
    async create(order: Order) {
        return await PostgresDataSource.getRepository(Order).create(order);
    }

    async save(order: Order): Promise<Order> {
        return await PostgresDataSource.getRepository(Order).save(order);
    }

    async getAll(): Promise<Order[]> {
        return await PostgresDataSource.getRepository(Order).find();
    }

    async getById(orderId: string): Promise<Order> {
        return await PostgresDataSource.getRepository(Order).findOne({where: {orderId}});
    }

    async getBy(data: object): Promise<Order> {
        return await PostgresDataSource.getRepository(Order).findOne({where: data});
    }

    async delete(orderId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Order).delete(orderId);
    }
}

export default new OrderPostgresRepository()