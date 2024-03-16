class PostgresUserRepository {
    async findOne(data: object){
        return PostgresDataSource.getRepository(User).findOne({where: data})
    }
    async create(data: object){
        return PostgresDataSource.getRepository(User).create(data)
    }

    async save(data: any){
        return PostgresDataSource.getRepository(User).save(data)
    }

    async find(){
        return PostgresDataSource.getRepository(User).find()
    }

    async delete(id: number){
        return PostgresDataSource.getRepository(User).delete(id)
    }
}

export default new PostgresUserRepository()