import {Category} from "../../domain/Category";

export interface CategoryRepository {
    addCategory(
        category: string,
        bookId: string,
        publisherId: string,
    ): Promise<Category>;
    getAllCategories(): Promise<Category[]>;
    getCategory(id: string): Promise<Category | null>;
    deleteCategory(id: string): Promise<void>;
}