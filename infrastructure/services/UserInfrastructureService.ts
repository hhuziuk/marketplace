import {UserDomainService} from "../../core/services/UserDomainService";
import {User} from "../../core/domain/User";
import {Role} from "../../core/domain/enums/Role";
import {Book} from "../../core/domain/Book";
import ApiError from "../exceptions/ApiError";
import * as bcrypt from 'bcrypt';
import {BookDomainService} from "../../core/services/BookDomainService";
import {WishlistDomainService} from "../../core/services/WishlistDomainService";
import UserPostgresRepository from "../database/PostgresRepository/UserPostgresRepository";
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
        return user;
    }
    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }
    async getById(userId: string): Promise<User | null> {
        return await this.userRepository.getById(userId);
    }
    async update(userId: string, userData: Partial<User>): Promise<User> {
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw ApiError.BadRequest("User not found");
        }
        Object.assign(user, userData);
        await this.userRepository.save(user);
        return user;
    }
    async delete(userId: string): Promise<void> {
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw ApiError.BadRequest("User not found");
        }
        await this.userRepository.delete(user);
    }
}

export class AdminInfrastructureService extends UserDomainService{
    constructor(readonly userRepository: UserDomainService = new UserDomainService(userRepository),
                readonly bookRepository: BookDomainService = new BookDomainService(bookRepository)){
        super(userRepository);
    }
    async verifySeller(sellerId: string): Promise<void> {
        const seller = await this.userRepository.getById(sellerId);
        if (!seller || seller.role !== Role.Seller) {
            throw ApiError.BadRequest("Seller not found");
        }
        seller.verified = true;
        await this.userRepository.save(seller);
    }
    async deleteSeller(sellerId: string): Promise<void> {
        const seller = await this.userRepository.getById(sellerId);
        if (!seller || seller.role !== Role.Seller) {
            throw ApiError.BadRequest("Seller not found");
        }
        await this.userRepository.delete(sellerId);
    }
    async deleteCustomer(customerId: string): Promise<void> {
        const customer = await this.userRepository.getById(customerId);
        if (!customer || customer.role !== Role.Customer) {
            throw ApiError.BadRequest("Customer not found");
        }
        await this.userRepository.delete(customerId);
    }
    async deleteItem(userId: string, itemId: string) : Promise<void>{
        const user = await this.userRepository.getById(userId);
        const item = await this.bookRepository.getById(itemId);
        if ((!user || !item) || user.role !== Role.Customer) {
            throw ApiError.BadRequest("Customer or book not found");
        }
        await this.bookRepository.delete(itemId);
    }
}

export class SellerInfrastructureService extends UserDomainService {
    constructor(readonly userRepository: any = new UserDomainService(userRepository),
                readonly bookRepository: any = new BookDomainService(bookRepository)){
        super(userRepository);
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
        price: number
    ): Promise<Book> {
        const item = await this.bookRepository.create({
            bookName,
            author,
            categoryId,
            publisherId,
            ratingId,
            description,
            ISBN,
            language,
            size,
            price
        });
        return item;
    }
    async updateItem(bookId: string, updatedData: Partial<Book>): Promise<Book> {
        const book = await this.bookRepository.getById(bookId);
        if (!book) {
            throw ApiError.BadRequest("Item not found");
        }
        Object.assign(book, updatedData);
        await this.bookRepository.save(book);
        return book;
    }
    async deleteItem(bookId: string): Promise<void> {
        const book = await this.bookRepository.getById(bookId);
        if (!book) {
            throw ApiError.BadRequest("Item not found");
        }
        await this.bookRepository.delete(book);
    }
}

export class CustomerInfrastructureService extends UserDomainService {
    constructor(readonly userRepository: UserDomainService = new UserDomainService(userRepository),
                readonly bookRepository: BookDomainService = new BookDomainService(bookRepository),
                readonly wishlistRepository: any = new WishlistDomainService(wishlistRepository)){
        super(userRepository);
    }
    async addItemToWishlist(userId: string, itemId: string): Promise<void> {
        const user = await this.userRepository.getById(userId);
        const item = await this.bookRepository.getById(itemId);
        if ((!user || !item) || user.role !== Role.Customer) {
            throw ApiError.BadRequest("Customer or book not found");
        }
        await this.wishlistRepository.addItemToWishlist(userId, itemId);
    }
    async removeItemFromWishlist(userId: string, itemId: string): Promise<void> {
        const user = await this.userRepository.getById(userId);
        const item = await this.bookRepository.getById(itemId);
        if ((!user || !item) || user.role !== Role.Customer) {
            throw ApiError.BadRequest("Customer or book not found");
        }
        await this.wishlistRepository.removeItemFromWishlist(userId, itemId);
    }
    async payment(): Promise<void> {
        // TODO
    }
}

export default new UserInfrastructureService(UserPostgresRepository);
