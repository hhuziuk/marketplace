import {Rating} from "../../domain/Rating";

export interface RatingRepostiory {
    addRating(
        ratingValue: number,
        comment: string
    ): Promise<Rating>;
    save(category: Rating): Promise<Rating>;
    update(ratingId: string): Promise<Rating | null>;
    getAll(): Promise<Rating[] | null>;
    delete(ratingId: string): Promise<void>;
}