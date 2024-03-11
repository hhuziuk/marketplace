import {BookRepository} from "../repositories/BookRepository/BookRepository";
import {Book} from "../domain/Book";

export class BookDomainService implements BookRepository {
    constructor(private bookRepository: BookRepository) {

    }

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
        return await this.bookRepository.create(bookName, author, categoryId, publisherId, ratingId, description, ISBN, language, size, price);
    }
    async getAll(): Promise<Book[]> {
        return await this.bookRepository.getAll();
    }
    async save(book: Book): Promise<Book> {
        return await this.bookRepository.save(book);
    }
    async findOne(object: object): Promise<Book> {
        return await this.bookRepository.findOne(object);
    }
    async getById(bookId: string): Promise<Book | null> {
        return await this.bookRepository.getById(bookId);
    }
    async getByName(bookName: string): Promise<Book | null> {
        return await this.bookRepository.getByName(bookName);
    }
    async getByAuthor(author: string): Promise<Book | null> {
        return await this.bookRepository.getByAuthor(author);
    }
    async delete(bookId: string): Promise<void> {
        return await this.bookRepository.delete(bookId);
    }
}
