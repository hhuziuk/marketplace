import {User} from "../domain/User";

export class AuthDomainService implements AuthRepository{
    constructor(private authRepository: AuthRepository) {}
    registration(user: User) {
        return this.authRepository.registration(user);
    }
    login(user: User){
        return this.authRepository.login(user);
    }
    logout(argument: any){
        return this.authRepository.logout(argument);
    }
    refresh(refreshToken: string){
        return this.authRepository.refresh(refreshToken);
    }
}