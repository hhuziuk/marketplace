import {Entity, ManyToOne} from "typeorm";
import {User} from "./UserEntity";

@Entity('Payment')
export class Payment {

    @ManyToOne(() => User, user => user.payment)
    user: User;
}