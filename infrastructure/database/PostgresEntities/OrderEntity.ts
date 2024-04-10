import {Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, Column} from "typeorm";
import {User} from "./UserEntity";
import {OrderItem} from "./OrderItemEntity";
import {Payment} from "./PaymentEntity";
import {IsBoolean, IsDate, IsEnum, IsNumber, IsUUID} from "class-validator";
import {DeliveryStatus} from "../../../core/domain/enums/DeliveryStatus";
import {Delivery} from "../../../core/domain/enums/Delivery";

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    public orderId: string;

    @Column({ type: 'timestamptz', nullable: false })
    @IsDate()
    public createdAt: Date;

    @Column({ type: 'enum', enum: DeliveryStatus, default: "Pending", nullable: true })
    @IsEnum(DeliveryStatus)
    public status: DeliveryStatus;

    @Column({ type: "float", nullable: false })
    @IsNumber()
    public amount: number;

    @Column({ type: 'enum', enum: Delivery, nullable: false })
    @IsEnum(Delivery)
    public delivery: Delivery;

    @Column({ type: "boolean", nullable: false, default: false })
    @IsBoolean()
    public isPaid: boolean;

    @OneToOne(() => Payment)
    @JoinColumn()
    payment: Payment;

    @ManyToOne(() => User, user => user.order)
    @JoinColumn()
    user: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
}
