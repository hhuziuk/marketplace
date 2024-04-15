import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {Parcel} from "../PostgresEntities/ParcelEntity";
import {DeleteResult} from "typeorm";

class ParcelPostgresRepository {
    async create(parcel: Parcel) {
        return await PostgresDataSource.getRepository(Parcel).create(parcel);
    }
    async save(parcel: Parcel): Promise<Parcel> {
        return await PostgresDataSource.getRepository(Parcel).save(parcel);
    }
    async getAll(): Promise<Parcel[]> {
        return await PostgresDataSource.getRepository(Parcel).find();
    }
    async getById(parcelId: string): Promise<Parcel> {
        return await PostgresDataSource.getRepository(Parcel).findOne({where: {parcelId}});
    }
    async getBy(data: object): Promise<Parcel> {
        return await PostgresDataSource.getRepository(Parcel).findOne({where: data});
    }
    async delete(parcelId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Parcel).delete(parcelId);
    }
}

export default new ParcelPostgresRepository()