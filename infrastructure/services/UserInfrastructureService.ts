import {UserDomainService} from "../../core/services/UserDomainService";
import {User} from "../../core/domain/User";
import {Role} from "../../core/domain/enums/Role";
import ApiError from "../exceptions/ApiError";
import * as bcrypt from 'bcrypt';
import UserPostgresRepository from "../database/PostgresRepository/UserPostgresRepository";

class UserInfrastructureService {
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
            throw ApiError.Conflict(`User with the same ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await this.userRepository.create({
            username,
            name,
            surname,
            email,
            hashPassword,
            activationLink,
            phoneNumber,
            country,
            city,
            postalCode,
            password: hashPassword,
            address,
            role
        })
        await this.userRepository.save(user)
        return user;
    }
    async verifySeller(sellerId: string): Promise<void> {
        const seller = await this.userRepository.getById(sellerId);
        if (!seller || seller.role !== Role.Seller) {
            throw ApiError.NotFound("Seller not found");
        }
        seller.verified = true;
        await this.userRepository.save(seller);
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
            throw ApiError.NotFound("User not found");
        }
        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const updatedUser = new User(
                user.userId,
                user.username,
                user.name,
                user.surname,
                user.email,
                hashedPassword,
                user.isActivated,
                user.activationLink,
                user.phoneNumber,
                user.country,
                user.city,
                user.postalCode,
                user.address,
                user.role,
                user.verified
            );
            Object.assign(user, updatedUser);
        } else {
            Object.assign(user, userData);
        }

        await this.userRepository.save(user);
        return user;
    }

    async delete(userId: string): Promise<void> {
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw ApiError.NotFound("User not found");
        }
        await this.userRepository.delete(user);
    }
}

export default new UserInfrastructureService(UserPostgresRepository);