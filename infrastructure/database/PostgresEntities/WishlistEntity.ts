import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {Book} from "./BookEntity";

@Entity('Wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn('uuid')
    public wishlistId: string;

    @OneToOne(() => User, user => user.wishlist)
    @JoinColumn()
    user: User;

    @OneToMany(() => Book, book => book.wishlist)
    book: Book[];
}