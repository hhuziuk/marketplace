import {DataSource} from "typeorm";
import {User} from "../infrastructure/database/PostgresEntities/UserEntity";
import {Book} from "../infrastructure/database/PostgresEntities/BookEntity";
import {Publisher} from "../infrastructure/database/PostgresEntities/PublisherEntity";
import {Category} from "../infrastructure/database/PostgresEntities/CategoryEntity";
import {Token} from "../infrastructure/database/PostgresEntities/TokenEntity";
import {WishlistBooks} from "../infrastructure/database/PostgresEntities/WishlistBooksEntity";
import {Wishlist} from "../infrastructure/database/PostgresEntities/WishlistEntity";
import {Favorite} from "../infrastructure/database/PostgresEntities/FavoriteEntity";
import {Order} from "../infrastructure/database/PostgresEntities/OrderEntity";
import {OrderItem} from "../infrastructure/database/PostgresEntities/OrderItemEntity";
import {Payment} from "../infrastructure/database/PostgresEntities/PaymentEntity";
import {Rating} from "../infrastructure/database/PostgresEntities/RatingEntity";

export const PostgresDataSource : DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: true,
    logging: false,
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
    subscribers: [],
    migrations: [],
})