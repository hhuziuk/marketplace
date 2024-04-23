import {User} from "../domain/User";
import {AuthRepository} from "../repositories/AuthorizationRepository/AuthorizationRepository";

export class AuthDomainService implements AuthRepository {
    constructor(private authRepository: AuthRepository) {
    }

    registration(user: User) {
        return this.authRepository.registration(user);
    }

    login(user: User) {
        return this.authRepository.login(user);
    }

    logout(refreshToken: string) {
        return this.authRepository.logout(refreshToken);
    }

    refresh(refreshToken: string) {
        return this.authRepository.refresh(refreshToken);
    }
}