import {Book} from "../../domain/Book";

export interface BookRepository {
    create(
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
    ) : Promise<Book>,
    getAll(): Promise<Book[]>;
    save(book: Book): Promise<Book>;
    getById(id: string): Promise<Book | null>;
    getByAuthor(author: string): Promise<Book | null>;
    getByName(bookName: string): Promise<Book | null>;
    delete(id: string): Promise<void>;
}