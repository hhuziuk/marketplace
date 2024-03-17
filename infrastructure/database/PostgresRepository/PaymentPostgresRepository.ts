import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {Payment} from "../PostgresEntities/PaymentEntity";

class PaymentPostgresRepository {
    async create(payment: Payment) {
        return await PostgresDataSource.getRepository(Payment).create(payment);
    }
    async save(payment: Payment): Promise<Payment> {
        return await PostgresDataSource.getRepository(Payment).save(payment);
    }
    async getAll(): Promise<Payment[]> {
        return await PostgresDataSource.getRepository(Payment).find();
    }
    async getById(paymentId: string): Promise<Payment> {
        return await PostgresDataSource.getRepository(Payment).findOne({where: {paymentId}});
    }
    async getBy(data: object): Promise<Payment> {
        return await PostgresDataSource.getRepository(Payment).findOne({where: data});
    }
    async delete(paymentId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Payment).delete(paymentId);
    }
}
export default new PaymentPostgresRepository()