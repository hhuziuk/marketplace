import {Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {Book} from "./BookEntity";

@Entity('Favorite')
export class Favorite {
    @PrimaryGeneratedColumn('uuid')
    public favoriteId: string;

    @OneToOne(() => User, user => user.favorite)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Book, book => book.favorites)
    book: Book | string;

}