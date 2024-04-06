import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./UserEntity";
import {Order} from "./OrderEntity";
import {IsDate, IsEnum, IsNumber, IsUUID} from "class-validator";
import {Delivery} from "../../../core/domain/enums/Delivery";
import {PaymentMethod} from "../../../core/domain/enums/PaymentMethod";

@Entity('Payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    public paymentId: string;

    @Column({ type: 'timestamptz', nullable: false })
    @IsDate()
    public createdAt: Date;

    @Column({ type: "float", nullable: false })
    @IsNumber()
    public totalPrice: number;

    @Column({ type: 'enum', enum: PaymentMethod, nullable: false })
    @IsEnum(PaymentMethod)
    public method: PaymentMethod;

    @OneToOne(() => Order, order => order.payment)
    @JoinColumn()
    order: Order;

    @ManyToOne(() => User, user => user.payment)
    user: User;
}