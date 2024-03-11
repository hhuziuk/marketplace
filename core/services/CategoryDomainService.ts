import {CategoryRepository} from "../repositories/CategoryRepository/CategoryRepository";
import {Category} from "../domain/Category";

export class CategoryDomainService implements CategoryRepository{
    constructor(private categoryRepository: CategoryRepository) {

    }
    async addCategory(
        category: string
    ): Promise<Category> {
        return await this.categoryRepository.addCategory(category);
    }
    async getAll(): Promise<Category[]> {
        return await this.categoryRepository.getAll();
    }
    async getById(categryId: string): Promise<Category | null> {
        return await this.categoryRepository.getById(categryId);
    }
    async getByName(categoryName: string): Promise<Category | null> {
        return await this.categoryRepository.getByName(categoryName);
    }
    async delete(categryId: string): Promise<void> {
        return await this.categoryRepository.delete(categryId);
    }
}
