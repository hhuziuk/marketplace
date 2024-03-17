import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {WishlistBooks} from "./WishlistBooksEntity";

@Entity('Wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn('uuid')
    public wishlistId: string;

    @OneToOne(() => User, user => user.wishlist)
    @JoinColumn()
    user: User;

    @OneToMany(() => WishlistBooks, wishlistBook => wishlistBook.wishlist)
    wishlistBooks: WishlistBooks[];
}