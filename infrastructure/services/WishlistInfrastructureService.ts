import {WishlistDomainService} from "../../core/services/WishlistDomainService";
import {Wishlist} from "../database/PostgresEntities/WishlistEntity";
import {DeleteResult} from "typeorm";
import ApiError from "../exceptions/ApiError";
import WishlistPostgresRepository from "../database/PostgresRepository/WishlistPostgresRepository";

class WishlistInfrastructureService {
    constructor(readonly wishlistRepository: any = new WishlistDomainService(wishlistRepository)) {
    }

    async addToWishList(bookId: string): Promise<Wishlist> {
        if (!bookId) {
            ApiError.NotFound("No bookId was provided is required");
        }
        const existingBookInWishlist = await this.wishlistRepository.getBy({id: bookId});
        if (existingBookInWishlist) {
            ApiError.Conflict(`Book with id ${existingBookInWishlist} already exists`);
        }
        const wishlist = await this.wishlistRepository.create(bookId);
        await this.wishlistRepository.save(wishlist);
        return wishlist;
    }

    async getAll(): Promise<Wishlist[]> {
        return await this.wishlistRepository.getAll();
    }

    async getBy(data: object): Promise<Wishlist> {
        return await this.wishlistRepository.getBy(data);
    }

    async deleteFromWishList(bookId: string): Promise<DeleteResult> {
        if (!bookId) {
            ApiError.NotFound(`No id was provided`);
        }
        return await this.wishlistRepository.delete(bookId);
    }

    async cleanWishList(): Promise<DeleteResult> {
        const allBooksInWishlist = await this.wishlistRepository.getAll();
        if (!allBooksInWishlist) {
            ApiError.NotFound(`No books were provided`);
        }
        return await this.wishlistRepository.remove(allBooksInWishlist);
    }
}

export default new WishlistInfrastructureService(WishlistPostgresRepository)