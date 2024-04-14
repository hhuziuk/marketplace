import {User} from "../../../core/domain/User";
class RedisService {
    async registration(user: User) {
        return {
            user,
        }
    }
    async login(user: User) {
        return {
            user,
        }
    }

    async logout(argument: any) {
        return null;
    }

    async refresh(refreshToken: any) {
        return null;
    }

}
export default new RedisService();