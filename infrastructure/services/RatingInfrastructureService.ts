import { RatingDomainService } from "../../core/services/RatingDomainService";
import { Rating } from "../database/PostgresEntities/RatingEntity";
import { PostgresDataSource } from "../../tools/PostgresConnection";
import { DeleteResult } from "typeorm";
import ApiError from "../exceptions/ApiError";

export class RatingInfrastructureService {
    constructor(readonly ratingRepository: any = new RatingDomainService(ratingRepository)) {}

    async create(rating: Rating): Promise<Rating> {
        const existingRating = await this.ratingRepository.getById(rating.ratingId);
        if (existingRating) {
            throw ApiError.BadRequest(`Rating with id ${rating.ratingId} already exists`);
        }
        const createdRating = await this.ratingRepository.create(rating);
        await this.ratingRepository.save(createdRating);
        return createdRating;
    }

    async getAll(): Promise<Rating[]> {
        const ratings = await this.ratingRepository.getAll();
        return ratings;
    }

    async getById(ratingId: string): Promise<Rating> {
        if(!ratingId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const rating = await this.ratingRepository.getById(ratingId);
        return rating;
    }
    async delete(ratingId: string): Promise<DeleteResult> {
        if(!ratingId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const category = this.ratingRepository.delete(ratingId)
        return category;
    }
}
