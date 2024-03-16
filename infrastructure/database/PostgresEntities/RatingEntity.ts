import {Entity, ManyToOne, OneToMany} from "typeorm";
import {User} from "./UserEntity";

@Entity('Rating')
export class Rating {

    @ManyToOne(() => User, user => user.rating)
    user: User;
}