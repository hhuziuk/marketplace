import {PublisherRepostiory} from "../repositories/PublisherRepository/PublisherRepository";
import {Publisher} from "../domain/Publisher";

export class PublisherDomainService implements PublisherRepostiory {
    constructor(private publisherDomainRepository: PublisherRepostiory) {
    }

    async addPublisher(publisherName: string): Promise<Publisher> {
        return await this.publisherDomainRepository.addPublisher(publisherName);
    }

    async getAll(): Promise<Publisher[]> {
        return await this.publisherDomainRepository.getAll();
    }

    async getById(publisherId: string): Promise<Publisher | null> {
        return await this.publisherDomainRepository.getById(publisherId);
    }

    async getByName(publisherName: string): Promise<Publisher | null> {
        return await this.publisherDomainRepository.getByName(publisherName);
    }

    async save(publisher: Publisher): Promise<Publisher> {
        return await this.publisherDomainRepository.save(publisher);
    }

    async update(publisherId: string): Promise<void> {
        return await this.publisherDomainRepository.update(publisherId);
    }

    async delete(publisherId: string): Promise<void> {
        return await this.publisherDomainRepository.delete(publisherId);
    }
}