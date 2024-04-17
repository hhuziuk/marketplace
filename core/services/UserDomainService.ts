import { UserRepository } from "../repositories/UserRepository/UserRepository";
import {Role} from "../domain/enums/Role";
import {User} from "../domain/User";

export class UserDomainService implements UserRepository {
    constructor(private userDomainRepository: UserRepository){}
    async create(
        username: string,
        name: string,
        surname: string,
        email: string,
        password: string,
        phoneNumber: string,
        country: string,
        city: string,
        postalCode: string,
        address: string,
        role: Role,
    ) : Promise<User> {
        return await this.userDomainRepository.create(username, name, surname, email, password, phoneNumber, country, city, postalCode, address, role);
    }
    async save(user: User): Promise<User> {
        return await this.userDomainRepository.save(user);
    }
    async update(userId: string): Promise<User> {
        return await this.userDomainRepository.update(userId);
    }
    async getAll(): Promise<User[]> {
        return await this.userDomainRepository.getAll();
    }
    async getById(userId: string): Promise<User> {
        return await this.userDomainRepository.getById(userId);
    }
    async getBy(data: object): Promise<User> {
        return await this.userDomainRepository.getBy(data);
    }
    async delete(userId: string): Promise<void> {
        return await this.userDomainRepository.delete(userId);
    }
    async verifySeller(sellerId: string){
        return await this.userDomainRepository.verifySeller(sellerId);
    }
}
