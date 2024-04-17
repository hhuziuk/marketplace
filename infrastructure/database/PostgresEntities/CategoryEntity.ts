import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "./BookEntity";
import {Publisher} from "./PublisherEntity";
import {IsString, MaxLength, MinLength} from "class-validator";

@Entity('Category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    public categoryId: string;

    @Column({ nullable: false })
    @IsString()
    @MaxLength(20, {
        message: 'categoryName is too long',
    })
    public categoryName: string;

    @OneToMany(() => Book, book => book.category)
    books: Book[];

    @ManyToMany(() => Publisher, publisher => publisher.category)
    @JoinTable()
    publishers: Publisher[];
}