import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {Order} from "./OrderEntity";
import {Book} from "./BookEntity";

@Entity('Favorite')
export class Favorite {
    @PrimaryGeneratedColumn('uuid')
    public favoriteId: string;

    @OneToOne(() => User, user => user.favorite)
    @JoinColumn()
    user: User;

    @OneToMany(() => Book, book => book.favorite)
    book: Book[];


}