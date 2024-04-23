import {User} from "../../domain/User";

export interface AuthRepository {
    registration(user: User): Promise<User>,

    login(user: User): Promise<User>,

    logout(refreshToken: string): Promise<User>,

    refresh(refreshToken: string): Promise<string>
}