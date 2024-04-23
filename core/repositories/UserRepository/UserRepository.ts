import {User} from "../../domain/User";
import {Role} from "../../domain/enums/Role";

export interface UserRepository {
    create(
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
    ): Promise<User>;

    save(user: User): Promise<User>;

    getAll(): Promise<User[]>;

    getBy(data: object): Promise<User>;

    getById(userId: string): Promise<User | null>;

    update(userId: string): Promise<User>;

    delete(userId: string): Promise<void>;

    verifySeller(sellerId: string): Promise<void>;
}

