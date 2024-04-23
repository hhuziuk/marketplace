import {Wishlist} from "../../domain/Wishlist";

export interface WishListRepository {
    addToWishList(bookId: string): Promise<Wishlist>,

    getAll(): Promise<Wishlist[]>,

    cleanWishList(): Promise<void>
}