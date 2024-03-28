import ApiError from "../exceptions/ApiError";
import {Favorite} from "../../core/domain/Favorite";
import {FavoriteDomainService} from "../../core/services/FavoriteDomainService";
import FavoritePostgresRepository from "../database/PostgresRepository/FavoritePostgresRepository";
class FavoriteInfrastructureService {
    constructor(readonly favoriteRepository: any = new FavoriteDomainService(favoriteRepository)){}
    async addToFavorite(bookId: string): Promise<Favorite> {
        const existingFavorite = await this.favoriteRepository.getBy({ bookId });
        if (existingFavorite) {
            throw ApiError.BadRequest(`The book is already in favorites`);
        }
        const favorite = await this.favoriteRepository.create({ bookId });
        await this.favoriteRepository.save(favorite);
        return favorite;
    }
    async getAll(): Promise<Favorite[]> {
        return await this.favoriteRepository.getAll();
    }
    async deleteFromFavorite(bookId: string): Promise<void> {
        const favorite = await this.favoriteRepository.getBy({ bookId });
        if (!favorite) {
            throw ApiError.BadRequest(`The book is not in favorites`);
        }
        await this.favoriteRepository.delete(favorite.id);
    }
}
export default new FavoriteInfrastructureService(FavoritePostgresRepository)