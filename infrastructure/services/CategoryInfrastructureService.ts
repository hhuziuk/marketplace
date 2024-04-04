import {CategoryDomainService} from "../../core/services/CategoryDomainService";
import {Category} from "../../core/domain/Category";
import ApiError from "../exceptions/ApiError";
import CategoryPostgresRepository from "../database/PostgresRepository/CategoryPostgresRepository";
class CategoryInfrastructureService {
    constructor(readonly categoryRepository: any = new CategoryDomainService(categoryRepository)){}
    async addCategory(category: string): Promise<Category> {
        const userType = await this.categoryRepository.getByName(category);
        if(userType){
            throw ApiError.BadRequest(`The same type already exists`)
        }
        const type = await this.categoryRepository.addCategory(category)
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
        const categories = await this.categoryRepository.getAll();
        return categories;
    }
    async getById(categoryId: string): Promise<Category | null> {
        if(!categoryId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const category = await this.categoryRepository.getById(categoryId);
        return category;
    }
    async getByName(categoryName: string): Promise<Category | null> {
        if(!categoryName){
            throw ApiError.BadRequest(`No categoryName was provided`)
        }
        const category = await this.categoryRepository.getByName(categoryName);
        return category;
    }
    async delete(categoryId: string): Promise<void> {
        if(!categoryId){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const category = this.categoryRepository.delete(categoryId)
        return category;
    }
}
export default new CategoryInfrastructureService(CategoryPostgresRepository)