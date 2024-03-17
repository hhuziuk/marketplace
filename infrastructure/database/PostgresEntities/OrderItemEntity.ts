import {Entity, ManyToOne, PrimaryGeneratedColumn, Column} from "typeorm";
import {Order} from "./OrderEntity";
import {Book} from "./BookEntity";
import {IsNumber, IsUUID} from "class-validator";

@Entity('OrderItem')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    public orderItemId: string;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;

    @ManyToOne(() => Book)
    book: Book;

    @Column({nullable: false})
    @IsNumber()
    quantity: number;
}
