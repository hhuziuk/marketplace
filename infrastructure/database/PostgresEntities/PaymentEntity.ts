import {Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {Order} from "./OrderEntity";

@Entity('Payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    public paymentId: string;

    @OneToOne(() => Order, order => order.payment)
    @JoinColumn()
    order: Order;

    @ManyToOne(() => User, user => user.payment)
    user: User;
}