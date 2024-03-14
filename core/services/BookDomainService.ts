import {BookRepository} from "../repositories/BookRepository/BookRepository";
import {Book} from "../domain/Book";

export class BookDomainService implements BookRepository {
    constructor(private bookDomainRepository: BookRepository) {}
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
    ) : Promise<Book> {
        return await this.bookDomainRepository.create(bookName, author, categoryId, publisherId, ratingId, description, ISBN, language, size, price);
    }
    async getAll(): Promise<Book[]> {
        return await this.bookDomainRepository.getAll();
    }
    async save(book: Book): Promise<Book> {
        return await this.bookDomainRepository.save(book);
    }
    async findOne(object: object): Promise<Book> {
        return await this.bookDomainRepository.findOne(object);
    }
    async getById(bookId: string): Promise<Book | null> {
        return await this.bookDomainRepository.getById(bookId);
    }
    async getByName(bookName: string): Promise<Book | null> {
        return await this.bookDomainRepository.getByName(bookName);
    }
    async getByAuthor(author: string): Promise<Book | null> {
        return await this.bookDomainRepository.getByAuthor(author);
    }
    async delete(bookId: string): Promise<void> {
        return await this.bookDomainRepository.delete(bookId);
    }
}
