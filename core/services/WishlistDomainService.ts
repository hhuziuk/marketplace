import {WishListRepository} from "../repositories/WishlistRepository/WishlistRepository";
import {Wishlist} from "../domain/Wishlist";

export class WishlistDomainService implements WishListRepository {
    constructor(private wishlistDomainRepository : WishListRepository){}
    async addToWishList(bookId: string) : Promise<Wishlist> {
        return await this.wishlistDomainRepository.addToWishList(bookId);
    }
    async getAll() : Promise<Wishlist[]> {
        return await this.wishlistDomainRepository.getAll();
    }
    async cleanWishList() : Promise<void> {
        return await this.wishlistDomainRepository.cleanWishList();
    }
}