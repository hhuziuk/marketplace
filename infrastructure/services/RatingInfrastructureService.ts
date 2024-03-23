import {RatingDomainService} from "../../core/services/RatingDomainService";

export class RatingInfrastructureService {
    constructor(readonly ratingRepository: any = new RatingDomainService(ratingRepository)){}

}