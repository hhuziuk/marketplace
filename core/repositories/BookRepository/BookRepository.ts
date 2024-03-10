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
    findOne(object: object): Promise<Book>;
    getById(id: string): Promise<Book | null>;
    delete(id: string): Promise<void>;
}