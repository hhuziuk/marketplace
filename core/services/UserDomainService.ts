import {
    AdminRepository,
    CustomerRepository,
    SellerRepository,
    UserRepository
} from "../repositories/UserRepository/UserRepository";
import {Role} from "../domain/enums/Role";
import {User} from "../domain/User";
import {Book} from "../domain/Book";

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
}

export class AdminDomainService extends UserDomainService{
    constructor(private adminDomainRepository: AdminRepository){
        super(adminDomainRepository);
    }
    async verifySeller(sellerId: string) : Promise<void>{
        return await this.adminDomainRepository.verifySeller(sellerId);
    }
    async deleteSeller(sellerId: string) : Promise<void>{
        return await this.adminDomainRepository.deleteSeller(sellerId);
    }
    async deleteCustomer(customerId: string) : Promise<void>{
        return await this.adminDomainRepository.deleteCustomer(customerId);
    }
    async deleteItem(itemId: string) : Promise<void>{
        return await this.adminDomainRepository.deleteItem(itemId);
    }
}

export class SellerDomainService extends UserDomainService {
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
        return await this.sellerDomainRepository.addItem(bookName, author, categoryId, publisherId, ratingId, description, ISBN, language, size, price);
    }
    async updateItem(itemId: string): Promise<Book> {
        return await this.sellerDomainRepository.updateItem(itemId);
    }
    async deleteItem(itemId: string): Promise<void> {
        return await this.sellerDomainRepository.deleteItem(itemId);
    }
}
export class CustomerDomainService extends UserDomainService {
    constructor(private customerDomainRepository : CustomerRepository) {
        super(customerDomainRepository);
    }
    async addItemToWishlist(itemId: string): Promise<void> {
        return await this.customerDomainRepository.addItemToWishlist(itemId);
    }
    async removeItemFromWishlist(itemId: string): Promise<void> {
        return await this.customerDomainRepository.removeItemFromWishlist(itemId);
    }
    async payment(): Promise<void> {
        return await this.customerDomainRepository.payment();
    }
}