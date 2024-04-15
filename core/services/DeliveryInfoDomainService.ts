import {DeliveryInfo} from "../domain/DeliveryInfo";
import {DeliveryInfoRepository} from "../repositories/DeliveryInfoRepository/DeliveryInfoRepository";

export class DeliveryInfoDomainService implements DeliveryInfoRepository{
    constructor(private deliveryInfoDomainRepository: DeliveryInfoRepository) {}
    async create(
        deliveryInfoId: string,
        shipmentId: string,
        location: string,
        statusDescription: string,
        timestamp: Date,
    ): Promise<DeliveryInfo> {
        return await this.deliveryInfoDomainRepository.create(deliveryInfoId, shipmentId, location, statusDescription, timestamp);
    }
    async save(deliveryInfo: DeliveryInfo): Promise<DeliveryInfo> {
        return await this.deliveryInfoDomainRepository.save(deliveryInfo);
    }
    async update(deliveryInfoId: string): Promise<DeliveryInfo> {
        return await this.deliveryInfoDomainRepository.update(deliveryInfoId);
    }
    async getAll(): Promise<DeliveryInfo[]> {
        return await this.deliveryInfoDomainRepository.getAll();
    }
    async getById(deliveryInfoId: string): Promise<DeliveryInfo | null> {
        return await this.deliveryInfoDomainRepository.getById(deliveryInfoId);
    }
    async delete(deliveryInfoId: string): Promise<void> {
        return await this.deliveryInfoDomainRepository.delete(deliveryInfoId);
    }
}
