import {PostgresDataSource} from "../../../tools/PostgresConnection";
import {Token} from "../../../core/domain/Token";
class PostgresTokenRepository {
    async getBy(data: object){
        return PostgresDataSource.getRepository(Token).findOne({where: data})
    }
    async create(data: object){
        return PostgresDataSource.getRepository(Token).create(data)
    }
    async save(data: any){
        return PostgresDataSource.getRepository(Token).save(data)
    }
    async getAll(){
        return await PostgresDataSource.getRepository(Token).find()
    }
    async findOneBy(tokenId: string){
        return PostgresDataSource.getRepository(Token).findOneBy({tokenId})
    }
    async removeToken(refreshToken: object) {
        return PostgresDataSource.getRepository(Token).delete(refreshToken);
    }
}
export default new PostgresTokenRepository()