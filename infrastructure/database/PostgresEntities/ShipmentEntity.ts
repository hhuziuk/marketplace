import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsEnum, IsString, IsUUID, MaxLength} from "class-validator";
import {ParcelStatus} from "../../../core/domain/enums/ParcelStatus";
import {Order} from "./OrderEntity";
import {Parcel} from "./ParcelEntity";

@Entity('Shipment')
export class Shipment {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    public shipmentId: string;

    @Column({ nullable: false })
    @IsString()
    @MaxLength(50, {
        message: 'carrier\`s name  is too long',
    })
    public carrier: string;

    @Column({ nullable: false })
    @IsString()
    @MaxLength(30, {
        message: 'service\`s name is too long',
    })
    public service: string;

    @Column({ nullable: false })
    @IsString()
    @MaxLength(80, {
        message: 'addressFrom is too long',
    })
    public addressFrom: string;

    @Column({ nullable: false })
    @IsString()
    @MaxLength(80, {
        message: 'addressTo is too long',
    })
    public addressTo: string;

    @Column({ type: 'enum', enum: ParcelStatus, default: "Processing", nullable: true })
    @IsEnum(ParcelStatus)
    public shipmentStatus: ParcelStatus;

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order;

    @OneToMany(() => Parcel, parcel => parcel.shipment)
    parcel: Parcel[];
}
