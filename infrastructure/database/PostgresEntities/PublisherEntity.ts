import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "./BookEntity";
import {Category} from "./CategoryEntity";
import {IsString, MaxLength, MinLength} from "class-validator";

@Entity('Publisher')
export class Publisher {
    @PrimaryGeneratedColumn('uuid')
    public publisherId: string;

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'publisherName is too short',
    })
    @MaxLength(40, {
        message: 'publisherName is too long',
    })
    public publisherName: string;

    @OneToMany(() => Book, book => book.publisher)
    books: Book[];

    @ManyToMany(() => Category, category => category.publishers)
    @JoinTable()
    category: Category[];
}