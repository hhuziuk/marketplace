import {BookDomainService} from "../../core/services/BookDomainService";
import {Book} from "../../core/domain/Book";
import ApiError from "../exceptions/ApiError";
import BookPostgresRepository from "../database/PostgresRepository/BookPostgresRepository";
import {User} from "../database/PostgresEntities/UserEntity";
import {Role} from "../../core/domain/enums/Role";
class BookInfrastructureService {
    constructor(readonly bookRepository: any = new BookDomainService(bookRepository)){}
    async create(
        bookName: string,
        author: string,
        categoryId: string,
        publisherId: string,
        ratingId: string,
        description: string,
        ISBN: string,
        language: string,
        size: string,
        price: number,
        seller: User
    ) : Promise<Book> {
        if (seller.role !== Role.Seller || !seller.verified) {
            throw ApiError.Unauthorized();
        }

        const userBook = await this.bookRepository.getBy({ISBN})
        if(userBook){
            throw ApiError.BadRequest(`The same book already exists`)
        }
        const book  = await this.bookRepository.create({bookName, author, categoryId, publisherId, ratingId, description, ISBN, language, size, price})
        await this.bookRepository.save(book)
        return book;
    }
    async getAll(): Promise<Book[]> {
        return await this.bookRepository.getAll()
    }
    async getById(bookId: string): Promise<Book | null> {
        const book = await this.bookRepository.getById(bookId)
        return book;
    }
    async getByName(bookName: string): Promise<Book | null> {
        const book = await this.bookRepository.getByName(bookName)
        return book;
    }
    async getByAuthor(bookAuthor: string): Promise<Book | null> {
        const book = await this.bookRepository.getByAuthor(bookAuthor)
        return book;
    }
    async delete(bookId: string): Promise<void> {
        if(!bookId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const book = await this.bookRepository.delete(bookId)
        return book;
    }
    async update(bookId: string, updates: Partial<Book>): Promise<Book> {
        if(!bookId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const existingBook = await this.bookRepository.getById(bookId);
        if (!existingBook) {
            throw ApiError.BadRequest(`Book with id ${bookId} not found`);
        }
        Object.assign(existingBook, updates);
        const updatedBook = await this.bookRepository.save(existingBook);
        return updatedBook;
    }
}
export default new BookInfrastructureService(BookPostgresRepository);