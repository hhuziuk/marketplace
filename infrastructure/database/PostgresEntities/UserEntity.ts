import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import {IsBoolean, IsEmail, IsEnum, IsMobilePhone, IsString, MaxLength, MinLength} from 'class-validator';
import {Role} from "../../../core/domain/enums/Role";
import {Wishlist} from "../../../core/domain/Wishlist";
import {Favorite} from "../../../core/domain/Favorite";
import {Rating} from "./RatingEntity";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public userId: string;

    @Column({ nullable: false, unique: true })
    @IsString()
    public username: string;

    @Column({ nullable: false })
    @IsString()
    public name: string;

    @Column({ nullable: false })
    @IsString()
    public surname: string;

    @Column({ nullable: false, unique: true })
    @IsEmail()
    public email: string;

    @Column({ nullable: false, default: false })
    @IsBoolean()
    public isActivated: boolean;

    @Column()
    @IsString()
    public activationLink: string;

    @Column({ nullable: false, unique: true })
    @IsMobilePhone()
    public phoneNumber: string

    @Column({ nullable: false })
    @IsString()
    public country: string

    @Column({ nullable: false })
    @IsString()
    public city: string

    @Column({ nullable: false })
    public postalCode: string

    @Column({ nullable: false })
    public address: string

    @Column({ nullable: false, default: 'USER' })
    @IsEnum(Role)
    public role: Role

    @OneToOne(() => Wishlist)
    wishlist: Wishlist;

    @OneToOne(() => Favorite)
    favorite: Favorite;


    @OneToMany(() => Rating, rating => rating.user)
    rating: Rating;


}