import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "./BookEntity";
import {Wishlist} from "./WishlistEntity";

@Entity('WishlistBooks')
export class WishlistBooks {
    @PrimaryGeneratedColumn('uuid')
    public wishlistBooksId: string;

    @ManyToOne(() => Wishlist, wishlist => wishlist.wishlistBooks)
    wishlist: Wishlist;

    @ManyToOne(() => Book, book => book.wishlistBooks)
    book: Book;
}