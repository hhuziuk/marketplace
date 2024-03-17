import {Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinTable, JoinColumn, OneToMany} from "typeorm";
import {User} from "./UserEntity";
import {OrderItem} from "./OrderItemEntity";
import {Payment} from "./PaymentEntity";

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    public orderId: string;

    @OneToOne(() => Payment)
    @JoinColumn()
    payment: Payment;

    @ManyToOne(() => User, user => user.order)
    @JoinColumn()
    user: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
}
