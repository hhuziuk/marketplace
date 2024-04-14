import { RatingDomainService } from "../../core/services/RatingDomainService";
import { Rating } from "../database/PostgresEntities/RatingEntity";
import { DeleteResult } from "typeorm";
import ApiError from "../exceptions/ApiError";
import RatingPostgresRepository from "../database/PostgresRepository/RatingPostgresRepository";
import {Book} from "../../core/domain/Book";

class RatingInfrastructureService {

    constructor(readonly ratingRepository: any = new RatingDomainService(ratingRepository)) {}
    async create(ratingData: Partial<Rating>): Promise<Rating> {
        const { ratingValue, comment } = ratingData;
        if (ratingValue === undefined || ratingValue === null) {
            throw ApiError.BadRequest("Rating value is required");
        }
        const existingRating = await this.ratingRepository.getByRatingValue(ratingValue);
        if (existingRating) {
            throw ApiError.BadRequest(`Rating with value ${ratingValue} already exists`);
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
        if(!ratingId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        return await this.ratingRepository.getById(ratingId);
    }
    async delete(ratingId: string): Promise<DeleteResult> {
        if(!ratingId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        return await this.ratingRepository.delete(ratingId)
    }
    async update(ratingId: string, updates: Partial<Rating>): Promise<Book> {
        if(!ratingId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const existingRating = await this.ratingRepository.getById(ratingId);
        if (!existingRating) {
            throw ApiError.BadRequest(`Rating with id ${ratingId} not found`);
        }
        Object.assign(existingRating, updates);
        const updatedRating = await this.ratingRepository.save(existingRating);
        return updatedRating;
    }
}
export default new RatingInfrastructureService(RatingPostgresRepository);