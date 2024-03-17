import {DataSource} from "typeorm";
import {Book} from "../core/domain/Book";
import {Publisher} from "../core/domain/Publisher";
import {Token} from "../core/domain/Token";
import {User} from "../core/domain/User";
import {Category} from "../core/domain/Category";
import {Wishlist} from "../core/domain/Wishlist";
import {WishlistBooks} from "../core/domain/WishlistBooks";
import {Favorite} from "../core/domain/Favorite";
import {Order, OrderItem} from "../core/domain/Order";
import {Payment} from "../core/domain/Payment";
import {Rating} from "../core/domain/Rating";


export const PostgresDataSource : DataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    name: 'default',
    entities: [
        User,
        Book,
        Publisher,
        Category,
        Token,
        WishlistBooks,
        Wishlist,
        Favorite,
        Order,
        OrderItem,
        Payment,
        Rating
    ],
})