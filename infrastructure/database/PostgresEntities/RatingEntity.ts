import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {Book} from "./BookEntity";
import {IsNumber, IsString, IsUUID, MaxLength} from "class-validator";

@Entity('Rating')
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    public ratingId: string;

    @Column({nullable: true, type: "float"})
    @IsNumber()
    public ratingValue: number;

    @Column({ nullable: true })
    @IsString()
    @MaxLength(255, {
        message: 'comment is too long',
    })
    public comment: string;

    @ManyToOne(() => User, user => user.rating)
    user: User;

    @ManyToOne(() => Book, book => book.rating)
    book: Book;
}
