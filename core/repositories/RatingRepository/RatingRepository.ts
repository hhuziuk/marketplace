import {Rating} from "../../domain/Rating";

export interface RatingRepostiory {
    addRating(
        ratingValue: number,
        comment: string
    ): Promise<Rating>;
    updateRating(id: string): Promise<Rating | null>;
    getAllRatings(): Promise<Rating[] | null>;
    deleteRating(id: string): Promise<void>;
}