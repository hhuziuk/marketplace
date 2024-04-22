import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {User} from "../PostgresEntities/UserEntity";

class PostgresUserRepository {
    async create(user: any) {
        return await PostgresDataSource.getRepository(User).create(user);
    }

    async save(user: User): Promise<User> {
        return await PostgresDataSource.getRepository(User).save(user);
    }

    async getAll(): Promise<User[]> {
        return await PostgresDataSource.getRepository(User).find();
    }

    async getById(userId: string): Promise<User> {
        return await PostgresDataSource.getRepository(User).findOne({where: {userId}});
    }

    async getBy(data: object): Promise<User> {
        return await PostgresDataSource.getRepository(User).findOne({where: data});
    }

    async delete(userId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(User).delete(userId);
    }
}

export default new PostgresUserRepository()