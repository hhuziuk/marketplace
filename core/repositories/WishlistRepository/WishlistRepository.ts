import {Book} from "../../domain/Book";

export interface WishListRepository {
    addToWishList(bookId : string) : Promise<void>,
    getAll() : Promise<Book[]>,
    cleanWishList() : Promise<void>
}