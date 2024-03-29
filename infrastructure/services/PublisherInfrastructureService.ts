import {PublisherDomainService} from "../../core/services/PublisherDomainService";
import {Publisher} from "../database/PostgresEntities/PublisherEntity";
import {DeleteResult} from "typeorm";
import ApiError from "../exceptions/ApiError";
import PublisherPostgresRepository from "../database/PostgresRepository/PublisherPostgresRepository";
import {Category} from "../../core/domain/Category";

class PublisherInfrastructureService {
    constructor(readonly publisherRepository: any = new PublisherDomainService(publisherRepository)){}
    async create(publisher: string) {
        const userPublisher = await this.publisherRepository.getByName(publisher);
        if(userPublisher){
            throw ApiError.BadRequest(`The same type already exists`)
        }
        const type = await this.publisherRepository.addCategory(publisher)
        await this.publisherRepository.save(type)
        return type;
    }
    async getAll(): Promise<Publisher[]> {
        return await this.publisherRepository.getAll();
    }
    async getById(publisherId: string): Promise<Publisher> {
        if(!publisherId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        return await this.publisherRepository.getById(publisherId);
    }
    async getByName(publisherName: string): Promise<Publisher> {
        if(!publisherName){
            throw ApiError.BadRequest(`No categoryName was provided`)
        }
        return await this.publisherRepository.getByName(publisherName);
    }
    async delete(publisherId: string): Promise<DeleteResult> {
        if(!publisherId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        return await this.publisherRepository.delete(publisherId);
    }
    async update(publisherId: string, publisherName: string): Promise<Category> {
        const existingPublisher = await this.publisherRepository.getById(publisherId);
        if(!existingPublisher) {
            throw ApiError.BadRequest(`Category with id ${publisherId} not found`);
        }
        Object.assign(existingPublisher, { publisherName });
        return await this.publisherRepository.save(existingPublisher);
    }
}
export default new PublisherInfrastructureService(PublisherPostgresRepository);