import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {Book} from "./BookEntity";

@Entity('Rating')
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    public ratingId: string;

    @ManyToOne(() => User, user => user.rating)
    user: User;

    @ManyToOne(() => Book, book => book.rating)
    book: Book;
}