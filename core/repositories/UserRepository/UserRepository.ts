import {User} from "../../domain/User";
import {Book} from "../../domain/Book";
import {Role} from "../../domain/enums/Role";

export interface UserRepository {
    create(
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
        role: Role,
    ): Promise<User>;
    save(user: User): Promise<User>;
    getAll(): Promise<User[]>;
    getById(userId: string): Promise<User | null>;
    update(userId: string): Promise<User>;
    delete(userId: string): Promise<void>;
}

export interface AdminRepository extends UserRepository {
    verifySeller(sellerId: string): Promise<void>;
    deleteSeller(sellerId: string): Promise<void>;
    deleteCustomer(customerId: string): Promise<void>;
    deleteItem(itemId: string): Promise<void>;
}

export interface SellerRepository extends UserRepository {
    addItem(
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
    ): Promise<Book>;
    updateItem(itemId: string): Promise<Book>;
    deleteItem(itemId: string): Promise<void>;
}

export interface CustomerRepository extends UserRepository {
    addItemToWishlist(itemId: string): Promise<void>;
    removeItemFromWishlist(itemId: string): Promise<void>;
    payment(): Promise<void>;
}