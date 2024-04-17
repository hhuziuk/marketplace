import {ParcelRepository} from "../repositories/ParcelRepository/ParcelRepository";
import {Parcel} from "../domain/Parcel";

export class ParcelDomainService implements ParcelRepository{
    constructor(private parcelDomainRepository: ParcelRepository) {}
    async create(
        parcelId: string,
        shipmentId: number,
        userId: number,
        weight: number,
        length: number,
        width: number,
        height: number,
    ): Promise<Parcel> {
        return await this.parcelDomainRepository.create(parcelId, shipmentId, userId, weight, length, width, height);
    }
    async save(parcel: Parcel): Promise<Parcel> {
        return await this.parcelDomainRepository.save(parcel);
    }
    async update(parcelId: string): Promise<Parcel> {
        return await this.parcelDomainRepository.update(parcelId);
    }
    async getAll(): Promise<Parcel[]> {
        return await this.parcelDomainRepository.getAll();
    }
    async getById(deliveryInfoId: string): Promise<Parcel | null> {
        return await this.parcelDomainRepository.getById(deliveryInfoId);
    }
    async delete(deliveryInfoId: string): Promise<void> {
        return await this.parcelDomainRepository.delete(deliveryInfoId);
    }
}
