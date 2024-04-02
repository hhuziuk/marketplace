import {Category} from "../../domain/Category";

export interface CategoryRepository {
    addCategory(category: string): Promise<Category>;
    getAll(): Promise<Category[]>;
    save(category: Category): Promise<Category>;
    getById(categoryId: string): Promise<Category | null>;
    getByName(categoryName: string): Promise<Category | null>;
    update(categoryId: string): Promise<Category>;
    delete(categoryId: string): Promise<void>;
}