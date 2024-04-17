import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {Wishlist} from "../PostgresEntities/WishlistEntity";

class WishlistPostgresRepository {
    async create(wishlist: Wishlist) {
        return await PostgresDataSource.getRepository(Wishlist).create(wishlist);
    }
    async save(wishlist: Wishlist): Promise<Wishlist> {
        return await PostgresDataSource.getRepository(Wishlist).save(wishlist);
    }
    async getAll(): Promise<Wishlist[]> {
        return await PostgresDataSource.getRepository(Wishlist).find();
    }
    async getBy(data: object): Promise<Wishlist> {
        return await PostgresDataSource.getRepository(Wishlist).findOne({where: data});
    }
    async delete(wishlistId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Wishlist).delete(wishlistId);
    }
}
export default new WishlistPostgresRepository()