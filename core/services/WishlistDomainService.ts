import {WishListRepository} from "../repositories/WishlistRepository/WishlistRepository";

export class WishlistDomainService implements WishListRepository {
    constructor(private wishlistDomainRepository : WishListRepository){}
    async cleanWishList() : Promise<void> {
        return await this.wishlistDomainRepository.cleanWishList();
    }
}