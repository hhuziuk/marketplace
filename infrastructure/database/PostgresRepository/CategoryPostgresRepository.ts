import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {DeleteResult} from "typeorm";
import {Category} from "../PostgresEntities/CategoryEntity";

class CategoryPostgresRepository {
    async create(category: Category) {
        return await PostgresDataSource.getRepository(Category).create(category);
    }

    async save(category: Category): Promise<Category> {
        return await PostgresDataSource.getRepository(Category).save(category);
    }

    async getAll(): Promise<Category[]> {
        return await PostgresDataSource.getRepository(Category).find();
    }

    async getById(categoryId: string): Promise<Category> {
        return await PostgresDataSource.getRepository(Category).findOne({where: {categoryId}});
    }

    async getByName(categoryName: string): Promise<Category> {
        return await PostgresDataSource.getRepository(Category).findOne({where: {categoryName}});
    }

    async getBy(data: object): Promise<Category[]> {
        return await PostgresDataSource.getRepository(Category).find({where: data});
    }

    async delete(categoryId: string): Promise<DeleteResult> {
        return await PostgresDataSource.getRepository(Category).delete(categoryId);
    }
}

export default new CategoryPostgresRepository()