import {CategoryDomainService} from "../../core/services/CategoryDomainService";
import {Category} from "../../core/domain/Category";
import ApiError from "../exceptions/ApiError";
import CategoryPostgresRepository from "../database/PostgresRepository/CategoryPostgresRepository";
import {Book} from "../../core/domain/Book";
import {User} from "../../core/domain/User";

class CategoryInfrastructureService {
    constructor(readonly categoryRepository: any = new CategoryDomainService(categoryRepository)){}

    async addCategory(category: string): Promise<Category> {
        if (!category) {
            throw ApiError.BadRequest(`Category is required`);
        }
        const userType = await this.categoryRepository.getByName(category);
        if (userType) {
            throw ApiError.BadRequest(`The same type already exists`);
        }
        const type = await this.categoryRepository.create({ categoryName: category })
        await this.categoryRepository.save(type)
        return type;
    }

    async update(categoryId: string, categoryName: string): Promise<Category> {
        const existingCategory = await this.categoryRepository.getById(categoryId);
        if(!existingCategory) {
            throw ApiError.BadRequest(`Category with id ${categoryId} not found`);
        }
        Object.assign(existingCategory, { categoryName });
        const updatedCategory = await this.categoryRepository.save(existingCategory);
        return updatedCategory;
    }
    async getAll(): Promise<Category[]> {
        return await this.categoryRepository.getAll();
    }
    async getById(categoryId: string): Promise<Category | null> {
        if(!categoryId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        return await this.categoryRepository.getById(categoryId);
    }
    async getByName(categoryName: string): Promise<Category | null> {
        if(!categoryName){
            throw ApiError.BadRequest(`No categoryName was provided`)
        }
        return await this.categoryRepository.getByName(categoryName);
    }
    async delete(categoryId: string): Promise<void> {
        if(!categoryId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        return this.categoryRepository.delete(categoryId)
    }
}
export default new CategoryInfrastructureService(CategoryPostgresRepository)