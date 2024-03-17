import {Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "./BookEntity";
import {Category} from "./CategoryEntity";

@Entity('Publisher')
export class Publisher {
    @PrimaryGeneratedColumn('uuid')
    public publisherId: string;

    @OneToMany(() => Book, book => book.publisher)
    books: Book[];

    @ManyToMany(() => Category, category => category.publishers)
    @JoinTable()
    category: Category[];
}