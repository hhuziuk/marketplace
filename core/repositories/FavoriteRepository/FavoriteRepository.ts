import {Favorite} from "../../domain/Favorite";

export interface FavoriteRepository {
    addToFavorite(bookId: string): Promise<Favorite>,
    removeFromFavorite(bookId: string): Promise<void>
}