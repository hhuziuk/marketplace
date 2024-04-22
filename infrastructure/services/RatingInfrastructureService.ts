import {RatingDomainService} from "../../core/services/RatingDomainService";
import {Rating} from "../database/PostgresEntities/RatingEntity";
import {DeleteResult} from "typeorm";
import ApiError from "../exceptions/ApiError";
import RatingPostgresRepository from "../database/PostgresRepository/RatingPostgresRepository";

class RatingInfrastructureService {

    constructor(readonly ratingRepository: any = new RatingDomainService(ratingRepository)) {
    }

    async create(ratingData: Partial<Rating>): Promise<Rating> {
        const {ratingValue, comment} = ratingData;
        if (ratingValue === undefined || ratingValue === null) {
            ApiError.BadRequest("Rating value is required");
        }
        const rating = await this.ratingRepository.create({
            ratingValue,
            comment,
        });
        await this.ratingRepository.save(rating);
        return rating;
    }

    async getAll(): Promise<Rating[]> {
        return await this.ratingRepository.getAll();
    }

    async getById(ratingId: string): Promise<Rating> {
        if (!ratingId) {
            ApiError.BadRequest(`No id was provided`)
        }
        return await this.ratingRepository.getById(ratingId);
    }

    async delete(ratingId: string): Promise<DeleteResult> {
        if (!ratingId) {
            ApiError.BadRequest(`No id was provided`)
        }
        return await this.ratingRepository.delete(ratingId)
    }

    async update(ratingId: string, updates: Partial<Rating>): Promise<Rating> {
        if (!ratingId) {
            ApiError.BadRequest(`No id was provided`)
        }
        const existingRating = await this.ratingRepository.getById(ratingId);
        if (!existingRating) {
            ApiError.BadRequest(`Rating with id ${ratingId} not found`);
        }
        Object.assign(existingRating, updates);
        return await this.ratingRepository.save(existingRating);
    }
}

export default new RatingInfrastructureService(RatingPostgresRepository);