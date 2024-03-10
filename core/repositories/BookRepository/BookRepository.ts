import {Book} from "../../domain/Book";

export interface BookRepository {
    addBook(
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
    getBook(id: string) : Promise<Book | null>,
    getAllBooks() : Promise<Book[] | null>,
    updateBook(id: string) : Promise<Book | null>,
    deleteBook(id: string) : Promise<void>
}