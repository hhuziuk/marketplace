import {Rating} from "../../domain/Rating";

export interface RatingRepostiory {
    addRating(
        ratingValue: number,
        comment: string
    ): Promise<Rating>;
    update(id: string): Promise<Rating | null>;
    getAll(): Promise<Rating[] | null>;
    delete(id: string): Promise<void>;
}