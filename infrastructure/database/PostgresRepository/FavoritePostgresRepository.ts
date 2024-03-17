import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {Favorite} from "../PostgresEntities/FavoriteEntity";

class FavoritePostgresRepository {
    async create(category: Favorite) {
        return await PostgresDataSource.getRepository(Favorite).create(category);
    }
    async save(category: Favorite): Promise<Favorite> {
        return await PostgresDataSource.getRepository(Favorite).save(category);
    }
    async getAll(): Promise<Favorite[]> {
        return await PostgresDataSource.getRepository(Favorite).find();
    }
    async getBy(data: object): Promise<Favorite> {
        return await PostgresDataSource.getRepository(Favorite).findOne({where: data});
    }
    async delete(categoryId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Favorite).delete(categoryId);
    }
}
export default new FavoritePostgresRepository()