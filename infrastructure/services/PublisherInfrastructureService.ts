import {PublisherDomainService} from "../../core/services/PublisherDomainService";

export class PublisherInfrastructureService {
    constructor(readonly publisherRepository: any = new PublisherDomainService(publisherRepository)){}

}