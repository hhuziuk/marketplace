import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsDate, IsString, IsUUID, MaxLength} from "class-validator";
@Entity('DeliveryInfo')
export class DeliveryInfo {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    public deliveryInfoId: string;

    @Column({ nullable: false })
    @Column({ nullable: false })
    public location: string;

    @Column({ nullable: true })
    @IsString()
    @MaxLength(300, {
        message: 'statusDescription is too long',
    })
    public statusDescription: number;

    @Column({ type: 'timestamptz', nullable: false })
    @IsDate()
    timestamp : Date;

    //shipmentId: string,
}