import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {Publisher} from "../PostgresEntities/PublisherEntity";

class PublisherPostgresRepository {
    async create(publisher: Publisher) {
        return await PostgresDataSource.getRepository(Publisher).create(publisher);
    }

    async save(publisher: Publisher): Promise<Publisher> {
        return await PostgresDataSource.getRepository(Publisher).save(publisher);
    }

    async getAll(): Promise<Publisher[]> {
        return await PostgresDataSource.getRepository(Publisher).find();
    }

    async getById(publisherId: string): Promise<Publisher> {
        return await PostgresDataSource.getRepository(Publisher).findOne({where: {publisherId}});
    }

    async getByName(publisherName: string): Promise<Publisher> {
        return await PostgresDataSource.getRepository(Publisher).findOne({where: {publisherName}});
    }

    async getBy(data: object): Promise<Publisher> {
        return await PostgresDataSource.getRepository(Publisher).findOne({where: data});
    }

    async delete(categoryId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Publisher).delete(categoryId);
    }
}

export default new PublisherPostgresRepository()