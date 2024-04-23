import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import bcrypt from 'bcryptjs';
import UserPostgresRepository from "../infrastructure/database/PostgresRepository/UserPostgresRepository";
import {User} from "../infrastructure/database/PostgresEntities/UserEntity";
import {Role} from "../core/domain/enums/Role";

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user: any = await UserPostgresRepository.getBy({googleId: profile.id});

                if (!user) {
                    user = await UserPostgresRepository.create({
                        username: profile.displayName,
                        name: '',
                        surname: '',
                        email: profile.emails[0].value,
                        password: '',
                        isActivated: false,
                        activationLink: '',
                        phoneNumber: '',
                        country: '',
                        city: '',
                        postalCode: '',
                        address: '',
                        role: Role.Customer,
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
);


passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user: User = await UserPostgresRepository.getBy({username});

            if (!user) {
                return done(null, false, {message: 'Неверное имя пользователя.'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Неверный пароль.'});
            }
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user: User = await UserPostgresRepository.getById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;