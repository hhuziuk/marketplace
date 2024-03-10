import {User} from "../../domain/User";
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
    ) : Promise<User>,
    save(user: User): Promise<User>;
    getAll(): Promise<User>;
    getById(id: string | number): Promise<User>;
    delete(id: string | number): Promise<User>;
}

