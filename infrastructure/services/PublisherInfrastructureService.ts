import {PublisherDomainService} from "../../core/services/PublisherDomainService";
import {Publisher} from "../database/PostgresEntities/PublisherEntity";
import {DeleteResult} from "typeorm";
import ApiError from "../exceptions/ApiError";

export class PublisherInfrastructureService {
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
        const publishers = await this.publisherRepository.getAll();
        return publishers;
    }
    async getById(publisherId: string): Promise<Publisher> {
        if(!publisherId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const category = await this.publisherRepository.getById(publisherId);
        return category;
    }
    async getByName(publisherName: string): Promise<Publisher> {
        if(!publisherName){
            throw ApiError.BadRequest(`No categoryName was provided`)
        }
        const publisher = await this.publisherRepository.getByName(publisherName);
        return publisher;
    }
    async delete(publisherId: string): Promise<DeleteResult> {
        if(!publisherId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const publisher = this.publisherRepository.delete(publisherId)
        return publisher;
    }
}