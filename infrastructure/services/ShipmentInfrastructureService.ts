import Shippo from 'shippo';
import ShipmentPostgresRepository from "../database/PostgresRepository/ShipmentPostgresRepository";
import { Shipment } from "../database/PostgresEntities/ShipmentEntity";
import { ParcelStatus } from "../../core/domain/enums/ParcelStatus";
import ParcelPostgresRepository from "../database/PostgresRepository/ParcelPostgresRepository";
import logger from "../../tools/logger";
import OrderInfrastructureService from "./OrderInfrastructureService";

class ShipmentInfrastructureService {
    private readonly client: any;

    constructor(
        private readonly shipmentRepository: any = ShipmentPostgresRepository,
        private readonly parcelRepository: any = ParcelPostgresRepository
    ) {
        this.client = new Shippo(process.env.SHIPPO_API_KEY);
    }

    async createShipment(data: any): Promise<Shipment> {
        const shipment = await this.client.shipment.create({
            address_from: {
                name: data.shipment.address_from.name,
                street1: data.shipment.address_from.street1,
                city: data.shipment.address_from.city,
                state: data.shipment.address_from.state,
                zip: data.shipment.address_from.zip,
                country: data.shipment.address_from.country,
                phone: data.shipment.address_from.phone,
            },
            address_to: {
                name: data.shipment.address_to.name,
                street1: data.shipment.address_to.street1,
                city: data.shipment.address_to.city,
                state: data.shipment.address_to.state,
                zip: data.shipment.address_to.zip,
                country: data.shipment.address_to.country,
                phone: data.shipment.address_to.phone,
            },
            parcels: [{
                length: data.shipment.parcels[0].length,
                width: data.shipment.parcels[0].width,
                height: data.shipment.parcels[0].height,
                weight: data.shipment.parcels[0].weight,
                mass_unit: data.shipment.parcels[0].mass_unit,
                distance_unit: data.shipment.parcels[0].distance_unit
            }],
            orderId: data.orderId
        });

        const savedShipment = await this.shipmentRepository.create({
            carrier: shipment.rates[0].provider,
            service: shipment.rates[0].servicelevel.name,
            addressFrom: shipment.address_from.street1,
            addressTo: shipment.address_to.street1,
            shipmentStatus: ParcelStatus.PROCESSING,
            order: data.orderId,
            shipmentId: shipment.object_id
        });
        await this.shipmentRepository.save(savedShipment);

        const savedParcel = await this.parcelRepository.create({
            weight: data.shipment.parcels[0].weight,
            length: data.shipment.parcels[0].length,
            width: data.shipment.parcels[0].width,
            height: data.shipment.parcels[0].height,
            shipment: savedShipment.shipmentId,
        });
        await this.parcelRepository.save(savedParcel);

        const order = await OrderInfrastructureService.getById(data.orderId);
        if(order){
            order.shipment = savedShipment.shipmentId;
            await OrderInfrastructureService.update(order.orderId, order);
        }

        return shipment;
    }

    async trackShipment(trackingCode: string): Promise<any> {
        try {
            return await this.client.track.get_status(trackingCode);
        } catch (error) {
            throw new Error('Failed to track shipment');
        }
    }
}

export default new ShipmentInfrastructureService(ShipmentPostgresRepository, ParcelPostgresRepository);
