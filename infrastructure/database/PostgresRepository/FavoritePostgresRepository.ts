import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {Favorite} from "../PostgresEntities/FavoriteEntity";

class FavoritePostgresRepository {
    async create(favorite: Favorite) {
        return await PostgresDataSource.getRepository(Favorite).create(favorite);
    }
    async save(favorite: Favorite): Promise<Favorite> {
        return await PostgresDataSource.getRepository(Favorite).save(favorite);
    }
    async getAll(): Promise<Favorite[]> {
        return await PostgresDataSource.getRepository(Favorite).find();
    }
    async getBy(data: object): Promise<Favorite[]> {
        return await PostgresDataSource.getRepository(Favorite).find({where: data});
    }
    async delete(categoryId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Favorite).delete(categoryId);
    }
}
export default new FavoritePostgresRepository()