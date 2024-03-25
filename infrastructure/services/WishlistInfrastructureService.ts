import { WishlistDomainService } from "../../core/services/WishlistDomainService";
import { Wishlist } from "../database/PostgresEntities/WishlistEntity";
import { DeleteResult } from "typeorm";
import ApiError from "../exceptions/ApiError";

export class WishlistInfrastructureService {
    constructor(readonly wishlistRepository: any = new WishlistDomainService(wishlistRepository)){}

    async create(wishlist: Wishlist): Promise<Wishlist> {
        const existingWishlist = await this.wishlistRepository.getBy({ user: wishlist.user });
        if(existingWishlist){
            throw ApiError.BadRequest(`Wishlist already exists for user`);
        }
        const createdWishlist = await this.wishlistRepository.create(wishlist);
        await this.wishlistRepository.save(createdWishlist);
        return createdWishlist;
    }

    async getAll(): Promise<Wishlist[]> {
        return await this.wishlistRepository.getAll();
    }

    async getBy(data: object): Promise<Wishlist> {
        return await this.wishlistRepository.getBy(data);
    }

    async delete(wishlistId: string): Promise<DeleteResult> {
        if (!wishlistId) {
            throw ApiError.BadRequest(`No id was provided`);
        }
        return await this.wishlistRepository.delete(wishlistId);
    }
}
