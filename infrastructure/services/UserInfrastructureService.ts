import {UserDomainService} from "../../core/services/UserDomainService";
import {User} from "../../core/domain/User";
import {Role} from "../../core/domain/enums/Role";
import {
    AdminRepository,
    CustomerRepository,
    SellerRepository
} from "../../core/repositories/UserRepository/UserRepository";
import {Book} from "../../core/domain/Book";
import {AuthDomainService} from "../../core/services/AuthDomainService";
import ApiError from "../exceptions/ApiError";
import * as bcrypt from 'bcrypt';

export class UserInfrastructureService {
    constructor(readonly userRepository: any = new UserDomainService(userRepository)){}
    async create(
        username: string,
        name: string,
        surname: string,
        email: string,
        password: string,
        activationLink: string,
        phoneNumber: string,
        country: string,
        city: string,
        postalCode: string,
        address: string,
        role: Role
    ): Promise<User> {
        const candidate = await this.userRepository.getBy({username, email, phoneNumber })
        if(candidate){
            throw ApiError.BadRequest(`User with the same ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await this.userRepository.create({username,
            name,
            surname,
            email,
            hashPassword,
            activationLink,
            phoneNumber,
            country,
            city,
            postalCode,
            address,
            role})
        await this.userRepository.save(user)
        return await this.authRepository.registration(user);
    }

    async save(user: User): Promise<User> {

    }

    async getAll(): Promise<User[]> {

    }
    async getById(userId: string): Promise<User | null> {

    }
    async update(userId: string): Promise<User> {

    }
    async delete(userId: string): Promise<void> {

    }
}

export class AdminInfrastructureService extends UserDomainService{
    constructor(private adminDomainRepository: AdminRepository){
        super(adminDomainRepository);
    }
    async verifySeller(sellerId: string) : Promise<void>{

    }
    async deleteSeller(sellerId: string) : Promise<void>{

    }
    async deleteCustomer(customerId: string) : Promise<void>{

    }
    async deleteItem(itemId: string) : Promise<void>{

    }
}

export class SellerInfrastructureService extends UserDomainService {
    constructor(private sellerDomainRepository: SellerRepository) {
        super(sellerDomainRepository);
    }

    async addItem(
        bookName: string,
        author: string,
        categoryId: string,
        publisherId: string,
        ratingId: string,
        description: string,
        ISBN: string,
        language: string,
        size: string,
        price: number,
    ): Promise<Book> {

    }
    async updateItem(itemId: string): Promise<Book> {

    }
    async deleteItem(itemId: string): Promise<void> {

    }
}

export class CustomerInfrastructureService extends UserDomainService {
    constructor(private customerDomainRepository : CustomerRepository) {
        super(customerDomainRepository);
    }
    async addItemToWishlist(itemId: string): Promise<void> {

    }
    async removeItemFromWishlist(itemId: string): Promise<void> {

    }
    async payment(): Promise<void> {

    }
}
