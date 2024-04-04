import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsISBN, IsNumber, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Rating } from "./RatingEntity";
import { Favorite } from "./FavoriteEntity";
import { Category } from "./CategoryEntity";
import { Publisher } from "./PublisherEntity";
import { Wishlist } from "./WishlistEntity";
import { OrderItem } from "./OrderItemEntity";

@Entity('Book')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    public bookId: string;

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'bookName is too short',
    })
    @MaxLength(30, {
        message: 'bookName is too long',
    })
    public bookName: string;

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'author is too short',
    })
    @MaxLength(30, {
        message: 'author is too long',
    })
    public author: string;

    @Column({ nullable: true })
    @IsString()
    @MaxLength(255, {
        message: 'description is too long',
    })
    public description: string;

    @Column({ nullable: false, unique: true })
    @IsISBN()
    public ISBN: string;

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'language is too short',
    })
    @MaxLength(50, {
        message: 'language is too long',
    })
    public language: string;

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'size is too short',
    })
    @MaxLength(20, {
        message: 'size is too long',
    })
    public size: string;

    @Column({ type: "float", nullable: false })
    @IsNumber()
    public price: number;

    @OneToMany(() => Rating, rating => rating.book)
    rating: Rating[];

    @ManyToOne(() => Favorite, favorite => favorite.book)
    favorite: Favorite;

    @ManyToOne(() => Category, category => category.books)
    category: Category;

    @ManyToOne(() => Publisher, publisher => publisher.books)
    publisher: Publisher;

    @ManyToOne(() => Wishlist, wishlist => wishlist.book)
    wishlist: Wishlist;

    @OneToMany(() => OrderItem, orderItem => orderItem.book)
    orderItems: OrderItem[];
}