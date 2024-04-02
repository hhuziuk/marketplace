import {CategoryRepository} from "../repositories/CategoryRepository/CategoryRepository";
import {Category} from "../domain/Category";

export class CategoryDomainService implements CategoryRepository{
    constructor(private categoryDomainRepository: CategoryRepository) {}
    async addCategory(
        category: string
    ): Promise<Category> {
        return await this.categoryDomainRepository.addCategory(category);
    }
    async save(category: Category): Promise<Category> {
        return await this.categoryDomainRepository.save(category);
    }
    async update(categoryId: string): Promise<Category> {
        return await this.categoryDomainRepository.update(categoryId);
    }
    async getAll(): Promise<Category[]> {
        return await this.categoryDomainRepository.getAll();
    }
    async getById(categryId: string): Promise<Category | null> {
        return await this.categoryDomainRepository.getById(categryId);
    }
    async getByName(categoryName: string): Promise<Category | null> {
        return await this.categoryDomainRepository.getByName(categoryName);
    }
    async delete(categryId: string): Promise<void> {
        return await this.categoryDomainRepository.delete(categryId);
    }
}
