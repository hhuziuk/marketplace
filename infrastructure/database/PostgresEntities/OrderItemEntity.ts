import {Entity, ManyToOne, PrimaryGeneratedColumn, Column} from "typeorm";
import {Order} from "./OrderEntity";
import {Book} from "./BookEntity";

@Entity('OrderItem')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    public orderItemId: string;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;

    @ManyToOne(() => Book)
    book: Book;

    @Column()
    quantity: number;
}
