import {FavoriteRepository} from "../repositories/FavoriteRepository/FavoriteRepository";
import {Favorite} from "../domain/Favorite";

export class FavoriteDomainRepository implements FavoriteRepository {
    constructor(private favoriteDomainRepository: FavoriteRepository) {}
    async addToFavorite(bookId: string): Promise<Favorite>{
        return await this.favoriteDomainRepository.addToFavorite(bookId);
    }
    async deleteFromFavorite(bookId: string): Promise<void>{
        return await this.favoriteDomainRepository.deleteFromFavorite(bookId);
    }
}