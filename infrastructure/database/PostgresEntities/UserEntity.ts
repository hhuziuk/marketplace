import {Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany} from 'typeorm';
import {IsBoolean, IsEmail, IsMobilePhone, IsString, MaxLength, MinLength} from 'class-validator';
import {Role} from "../../../core/domain/enums/Role";
import {Rating} from "./RatingEntity";
import {Order} from "./OrderEntity";
import {Payment} from "./PaymentEntity";
import {Wishlist} from "./WishlistEntity";
import {Favorite} from "./FavoriteEntity";
@Entity('User')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public userId?: string;

    @Column({ nullable: false, unique: true })
    @IsString()
    @MinLength(1, {
        message: 'username is too short',
    })
    @MaxLength(30, {
        message: 'username is too long',
    })
    public username?: string;

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'name is too short',
    })
    @MaxLength(50, {
        message: 'name is too long',
    })
    public name: string;

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'surname is too short',
    })
    @MaxLength(50, {
        message: 'surname is too long',
    })
    public surname: string;

    @Column({ nullable: false, unique: true })
    @IsEmail()
    public email: string;

    @Column({ nullable: false })
    @MinLength(4, {
        message: 'password is too short',
    })
    @MaxLength(50, {
        message: 'password is too long',
    })
    public password: string;

    @Column({ nullable: false, default: false })
    @IsBoolean()
    public isActivated: boolean;

    @Column({ nullable: false })
    public activationLink: string;

    @Column({ nullable: false, unique: true })
    @IsMobilePhone()
    public phoneNumber: string

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'country\'s name is too short',
    })
    @MaxLength(50, {
        message: 'country\'s name is too long',
    })
    public country: string

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'city\'s name is too short',
    })
    @MaxLength(50, {
        message: 'city\'s name is too long',
    })
    public city: string

    @Column({ nullable: false })
    public postalCode: string

    @Column({ nullable: false })
    @IsString()
    @MinLength(1, {
        message: 'address is too short',
    })
    @MaxLength(100, {
        message: 'address is too long',
    })
    public address: string

    @Column({ type: "enum", enum: Role, nullable: false })
    public role: Role;

    @OneToOne(() => Wishlist)
    wishlist: Wishlist;

    @OneToOne(() => Favorite)
    favorite: Favorite;

    @OneToMany(() => Rating, rating => rating.user)
    rating: Rating[];

    @OneToMany(() => Order, order => order.user)
    order: Order[];

    @OneToMany(() => Payment, payment => payment.user)
    payment: Payment[];
}