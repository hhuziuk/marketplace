import {DataSource} from "typeorm";
import {User} from "../infrastructure/database/PostgresEntities/UserEntity";
import {Book} from "../infrastructure/database/PostgresEntities/BookEntity";
import {Publisher} from "../infrastructure/database/PostgresEntities/PublisherEntity";
import {Category} from "../infrastructure/database/PostgresEntities/CategoryEntity";
import {Token} from "../infrastructure/database/PostgresEntities/TokenEntity";
import {Wishlist} from "../infrastructure/database/PostgresEntities/WishlistEntity";
import {Favorite} from "../infrastructure/database/PostgresEntities/FavoriteEntity";
import {Order} from "../infrastructure/database/PostgresEntities/OrderEntity";
import {OrderItem} from "../infrastructure/database/PostgresEntities/OrderItemEntity";
import {Payment} from "../infrastructure/database/PostgresEntities/PaymentEntity";
import {Rating} from "../infrastructure/database/PostgresEntities/RatingEntity";
import {Parcel} from "../infrastructure/database/PostgresEntities/ParcelEntity";
import {Shipment} from "../infrastructure/database/PostgresEntities/ShipmentEntity";

export const PostgresDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    entities: [
        User,
        Book,
        Publisher,
        Category,
        Token,
        Wishlist,
        Favorite,
        Order,
        OrderItem,
        Payment,
        Rating,
        Parcel,
        Shipment
    ],
    subscribers: [],
    migrations: [],
})