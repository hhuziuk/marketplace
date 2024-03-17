import {Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "./BookEntity";
import {Publisher} from "./PublisherEntity";

@Entity('Category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    public categoryId: string;

    @OneToMany(() => Book, book => book.category)
    books: Book[];

    @ManyToMany(() => Publisher, publisher => publisher.category)
    @JoinTable()
    publishers: Publisher[];
}