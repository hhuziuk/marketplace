import {Favorite} from "../../domain/Favorite";

export interface FavoriteRepository {
    addToFavorite(bookId: string): Promise<Favorite>,
    getAll(): Promise<Favorite[]>;
    deleteFromFavorite(bookId: string): Promise<void>
}