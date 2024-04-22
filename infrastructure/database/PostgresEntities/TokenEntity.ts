import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";

@Entity('Token')
export class Token {
    @PrimaryGeneratedColumn('uuid')
    public tokenId: string;

    @Column({nullable: false})
    public refreshToken: string;

    @OneToOne(() => User)
    @JoinColumn()
    public user: User;
}