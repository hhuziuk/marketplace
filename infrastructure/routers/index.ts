import express from "express"
import UserRouter from "./UserRouter";
import BookRouter from "./BookRouter";
import FavoriteRouter from "./FavoriteRouter";
import OrderRouter from "./OrderRouter";
import PaymentRouter from "./PaymentRouter";
import PublisherRouter from "./PublisherRouter";
import AuthRouter from "./AuthRouter";
import ShipmentRouter from "./ShipmentRouter";
import CategoryRouter from "./CategoryRouter";
const router = express.Router();

router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
router.use('/book', BookRouter)
router.use('/category', CategoryRouter)
router.use('/favorite', FavoriteRouter)
router.use('/order', OrderRouter)
router.use('/payment', PaymentRouter)
router.use('/publisher', PublisherRouter)
router.use('/shipment', ShipmentRouter)

export default router