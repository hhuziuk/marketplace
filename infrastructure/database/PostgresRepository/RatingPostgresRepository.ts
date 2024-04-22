import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {Rating} from "../PostgresEntities/RatingEntity";

class RatingPostgresRepository {
    async create(rating: Rating) {
        return await PostgresDataSource.getRepository(Rating).create(rating);
    }

    async save(rating: Rating): Promise<Rating> {
        return await PostgresDataSource.getRepository(Rating).save(rating);
    }

    async getAll(): Promise<Rating[]> {
        return await PostgresDataSource.getRepository(Rating).find();
    }

    async getById(ratingId: string): Promise<Rating> {
        return await PostgresDataSource.getRepository(Rating).findOne({where: {ratingId}});
    }

    async getBy(data: object): Promise<Rating> {
        return await PostgresDataSource.getRepository(Rating).findOne({where: data});
    }

    async delete(ratingId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Rating).delete(ratingId);
    }
}

export default new RatingPostgresRepository()