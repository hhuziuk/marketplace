import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsNumber} from "class-validator";
import {Shipment} from "./ShipmentEntity";

@Entity('Parcel')
export class Parcel {
    @PrimaryGeneratedColumn('uuid')
    public parcelId: string;

    @Column({ type: "float", nullable: false })
    @IsNumber()
    public weight: number;

    @Column({ type: "float", nullable: false })
    @IsNumber()
    public length: number;

    @Column({ type: "float", nullable: false })
    @IsNumber()
    public width: number;

    @Column({ type: "float", nullable: false })
    @IsNumber()
    public height: number;

    @ManyToOne(() => Shipment, shipment => shipment.parcel)
    shipment: Shipment | string;
}