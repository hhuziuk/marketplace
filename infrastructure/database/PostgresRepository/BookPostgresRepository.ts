import {Book} from "../PostgresEntities/BookEntity";
import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";


class PostgresBookRepository {
    async create(book: Book) {
        return await PostgresDataSource.getRepository(Book).create(book);
    }
    async save(user: Book): Promise<Book> {
        return await PostgresDataSource.getRepository(Book).save(user);
    }
    async getAll(): Promise<Book[]> {
        return await PostgresDataSource.getRepository(Book).find();
    }
    async getById(bookId: string): Promise<Book> {
        return await PostgresDataSource.getRepository(Book).findOne({where: {bookId}});
    }
    async getByAuthor(author: string): Promise<Book> {
        return await PostgresDataSource.getRepository(Book).findOne({where: {author}});
    }
    async getByName(bookName: string): Promise<Book> {
        return await PostgresDataSource.getRepository(Book).findOne({where: {bookName}});
    }
    async getBy(data: object): Promise<Book> {
        return await PostgresDataSource.getRepository(Book).findOne({where: data});
    }
    async delete(bookId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Book).delete(bookId);
    }
}

export default new PostgresBookRepository()