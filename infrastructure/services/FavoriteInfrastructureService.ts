import ApiError from "../exceptions/ApiError";
import {Favorite} from "../../core/domain/Favorite";
import {FavoriteDomainService} from "../../core/services/FavoriteDomainService";
import FavoritePostgresRepository from "../database/PostgresRepository/FavoritePostgresRepository";
import {BookDomainService} from "../../core/services/BookDomainService";
import BookPostgresRepository from "../database/PostgresRepository/BookPostgresRepository";

class FavoriteInfrastructureService {
    constructor(readonly favoriteRepository: any = new FavoriteDomainService(favoriteRepository),
                readonly bookRepository: any = new BookDomainService(bookRepository)){}
    async addToFavorite(userId: string, bookId: string): Promise<Favorite> {
        const existingBook = await this.bookRepository.getById(bookId);
        if (!existingBook) {
            throw ApiError.BadRequest(`The book does not exist`);
        }
        const existingFavorite = await this.favoriteRepository.getBy({ book: { bookId } });
        if (existingFavorite.length > 0) {
            throw ApiError.BadRequest(`The book is already in favorites`);
        }
        const favorite = await this.favoriteRepository.create({ user: userId , book: existingBook });
        await this.favoriteRepository.save(favorite);
        return favorite;
    }
    async getAll(): Promise<Favorite[]> {
        return await this.favoriteRepository.getAll();
    }
    async deleteFromFavorite(bookId: string): Promise<void> {
        const existingBook = await this.bookRepository.getById(bookId);
        if (!existingBook) {
            throw ApiError.BadRequest(`The book does not exist`);
        }
        const favorite = await this.favoriteRepository.getBy({ book: { bookId } });
        if (!favorite) {
            throw ApiError.BadRequest(`The book is not in favorites`);
        }
        await this.favoriteRepository.delete(favorite);
    }
}
export default new FavoriteInfrastructureService(FavoritePostgresRepository, BookPostgresRepository)