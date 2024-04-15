import EasyPost from '@easypost/api';
import ShipmentPostgresRepository from "../database/PostgresRepository/ShipmentPostgresRepository";
import { Shipment } from "../database/PostgresEntities/ShipmentEntity";
import { ParcelDomainService } from "../../core/services/ParcelDomainService";
import { ParcelStatus } from "../../core/domain/enums/ParcelStatus";
import ParcelPostgresRepository from "../database/PostgresRepository/ParcelPostgresRepository";

class ShipmentInfrastructureService {
    private readonly client: any;

    constructor(
        private readonly shipmentRepository: any = ShipmentPostgresRepository,
        private readonly parcelRepository: any = ParcelPostgresRepository
    ) {
        this.client = new EasyPost(process.env.EASYPOST_API_KEY);
    }

    async createShipment(data: any): Promise<Shipment> {
        try {
            const shipment = await this.client.Shipment.create({
                to_address: {
                    name: data.toAddress.name,
                    company: data.toAddress.company,
                    street1: data.toAddress.street1,
                    city: data.toAddress.city,
                    state: data.toAddress.state,
                    zip: data.toAddress.zip,
                },
                from_address: {
                    company: data.fromAddress.company,
                    street1: data.fromAddress.street1,
                    street2: data.fromAddress.street2,
                    city: data.fromAddress.city,
                    state: data.fromAddress.state,
                    zip: data.fromAddress.zip,
                    phone: data.fromAddress.phone,
                },
                parcel: {
                    length: data.parcel.length,
                    width: data.parcel.width,
                    height: data.parcel.height,
                    weight: data.parcel.weight,
                },
            });

            const savedShipment = await this.shipmentRepository.create({
                trackingNumber: shipment.tracking_code,
                carrier: shipment.selected_rate.carrier,
                service: shipment.selected_rate.service,
                addressFrom: shipment.from_address.street1,
                addressTo: shipment.to_address.street1,
                shipmentStatus: ParcelStatus.PROCESSING,
            });

            const savedParcel = await this.parcelRepository.create({
                weight: data.parcel.weight,
                length: data.parcel.length,
                width: data.parcel.width,
                height: data.parcel.height,
                shipmentId: savedShipment.shipmentId,
            });

            return savedShipment;
        } catch (error) {
            throw new Error('Failed to create shipment');
        }
    }

    async trackShipment(trackingCode: string): Promise<any> {
        try {
            const tracker = new this.client.Tracker({
                tracking_code: trackingCode,
            });

            return await tracker.save();
        } catch (error) {
            throw new Error('Failed to track shipment');
        }
    }
}

export default new ShipmentInfrastructureService(ShipmentPostgresRepository, ParcelPostgresRepository);
