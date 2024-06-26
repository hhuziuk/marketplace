import {CategoryDomainService} from "../../core/services/CategoryDomainService";
import {Category} from "../../core/domain/Category";
import ApiError from "../exceptions/ApiError";
import CategoryPostgresRepository from "../database/PostgresRepository/CategoryPostgresRepository";

class CategoryInfrastructureService {
    constructor(readonly categoryRepository: any = new CategoryDomainService(categoryRepository)) {
    }

    async addCategory(category: string): Promise<Category> {
        if (!category) {
            ApiError.BadRequest(`Category is required`);
        }
        const userType = await this.categoryRepository.getByName(category);
        if (userType) {
            ApiError.BadRequest(`The same type already exists`);
        }
        const type = await this.categoryRepository.create({categoryName: category})
        await this.categoryRepository.save(type)
        return type;
    }

    async update(categoryId: string, categoryName: string): Promise<Category> {
        const existingCategory = await this.categoryRepository.getById(categoryId);
        if (!existingCategory) {
            ApiError.BadRequest(`Category with id ${categoryId} not found`);
        }
        Object.assign(existingCategory, {categoryName});
        return await this.categoryRepository.save(existingCategory);
    }

    async getAll(): Promise<Category[]> {
        return await this.categoryRepository.getAll();
    }

    async getById(categoryId: string): Promise<Category | null> {
        if (!categoryId) {
            ApiError.BadRequest(`No id was provided`)
        }
        return await this.categoryRepository.getById(categoryId);
    }

    async getByName(categoryName: string): Promise<Category | null> {
        if (!categoryName) {
            ApiError.BadRequest(`No categoryName was provided`)
        }
        return await this.categoryRepository.getByName(categoryName);
    }

    async delete(categoryId: string): Promise<void> {
        if (!categoryId) {
            ApiError.BadRequest(`No id was provided`)
        }
        return this.categoryRepository.delete(categoryId)
    }
}

export default new CategoryInfrastructureService(CategoryPostgresRepository)