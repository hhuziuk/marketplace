import {Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {Favorite} from "./FavoriteEntity";
import {Payment} from "./PaymentEntity";

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    public orderId: string;

    @OneToOne(() => Payment)
    payment: Payment;

    @ManyToOne(() => User, user => user.order)
    user: User;
}