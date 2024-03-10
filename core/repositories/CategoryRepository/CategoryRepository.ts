import {Category} from "../../domain/Category";

export interface CategoryRepository {
    addCategory(
        category: string,
        bookId: string,
        publisherId: string,
    ): Promise<Category>;
    getAll(): Promise<Category[]>;
    getById(id: string): Promise<Category | null>;
    delete(id: string): Promise<void>;
}