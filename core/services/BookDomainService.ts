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
        const createdBook = await this.bookRepository.create(bookName, author, categoryId, publisherId, ratingId, description, ISBN, language, size, price);
        return createdBook;
    }
    async getAll(): Promise<Book[]> {
        return this.bookRepository.getAll();
    }
    async save(book: Book): Promise<Book> {
        return this.bookRepository.save(book);
    }
    async findOne(object: object): Promise<Book> {
        return this.bookRepository.findOne(object);
    }
    async getById(bookId: string): Promise<Book | null> {
        return this.bookRepository.getById(bookId);
    }
    async getByName(bookName: string): Promise<Book | null> {
        return this.bookRepository.getByName(bookName);
    }
    async getByAuthor(author: string): Promise<Book | null> {
        return this.bookRepository.getByAuthor(author);
    }
    async delete(bookId: string): Promise<void> {
        return this.bookRepository.delete(bookId);
    }
}
