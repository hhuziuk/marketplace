import {RatingRepostiory} from "../repositories/RatingRepository/RatingRepository";
import {Rating} from "../domain/Rating";

export class RatingDomainService implements RatingRepostiory {
    constructor(private ratingDomainRepository : RatingRepostiory) {}
    async addRating(
        ratingValue: number,
        comment: string
    ): Promise<Rating> {
        return await this.ratingDomainRepository.addRating(ratingValue, comment);
    }
    async update(ratingId: string): Promise<Rating | null> {
        return await this.ratingDomainRepository.update(ratingId);
    }
    async getAll(): Promise<Rating[] | null> {
        return await this.ratingDomainRepository.getAll();
    }
    async delete(ratingId: string): Promise<void> {
        return await this.ratingDomainRepository.delete(ratingId);
    }
}