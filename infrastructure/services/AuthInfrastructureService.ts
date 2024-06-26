import {AuthDomainService} from "../../core/services/AuthDomainService";
import bcrypt from "bcrypt";
import {v4} from "uuid";
import ApiError from "../exceptions/ApiError";
import mailService from "./OuterServices/MailService";
import JWTservice from "./OuterServices/JWTservice";
import {UserDomainService} from "../../core/services/UserDomainService";
import {Role} from "../../core/domain/enums/Role";
import UserPostgresRepository from "../database/PostgresRepository/UserPostgresRepository";
import RedisService from "./OuterServices/RedisService";

class AuthInfrastructureService {
    public cookiesEnabled: boolean

    constructor(readonly userRepository: any = new UserDomainService(userRepository),
                readonly authRepository: any = new AuthDomainService(authRepository)) {
        if (authRepository === JWTservice) {
            this.cookiesEnabled = true;
        } else {
            this.cookiesEnabled = false
        }
    }

    async registration(
        email: string,
        name: string,
        surname: string,
        username: string,
        password: string,
        phoneNumber: string,
        country: string,
        city: string,
        postalCode: string,
        address: string,
        role: Role
    ) {
        const candidate = await this.userRepository.getBy({email});
        if (candidate) {
            ApiError.Conflict(`User with the same ${email} already exists`)
        }
        if (!email || !name || !surname || !username || !password || !phoneNumber || !country || !city || !postalCode || !address || !role) {
            ApiError.BadRequest(`All data are required`)
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const activationLink = v4()
        const user = await this.userRepository.create({
            email,
            name,
            surname,
            username,
            password: hashPassword,
            activationLink,
            phoneNumber,
            country,
            city,
            postalCode,
            address,
            role
        })
        await this.userRepository.save(user)
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)
        return await this.authRepository.registration(user)
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.getBy({email});
        if (!user) {
            ApiError.BadRequest("User with this email does not exist")
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            ApiError.BadRequest("Wrong password")
        }
        return await this.authRepository.login(user)
    }

    async logout(argument: any) {
        return await this.authRepository.logout(argument)
    }

    async activate(activationLink: any) {
        const user = await this.userRepository.getBy({activationLink})
        if (!user) {
            ApiError.BadRequest("activation link is not correct")
        }
        user.isActivated = true;
        await this.userRepository.save(user)
    }

    async refresh(refreshToken: string) {
        return await this.authRepository.refresh(refreshToken)
    }
}

export default new AuthInfrastructureService(UserPostgresRepository, RedisService);