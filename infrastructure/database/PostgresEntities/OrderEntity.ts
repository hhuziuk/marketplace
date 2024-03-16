import {Entity, ManyToOne} from "typeorm";
import {User} from "./UserEntity";

@Entity('Order')
export class Order {

    @ManyToOne(() => User, user => user.order)
    user: User;
}