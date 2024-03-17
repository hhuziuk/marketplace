import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {Order} from "./OrderEntity";
import {IsDate, IsUUID} from "class-validator";

@Entity('Payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    public paymentId: string;

    @Column({ type: 'timestamptz', nullable: false })
    @IsDate()
    public createdAt: Date;

    @OneToOne(() => Order, order => order.payment)
    @JoinColumn()
    order: Order;

    @ManyToOne(() => User, user => user.payment)
    user: User;
}