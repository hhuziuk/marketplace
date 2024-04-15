import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import WishlistInfrastructureController from "../controllers/WishlistInfrastructureController";
const router = express.Router();

router.post('/add', checkRole(Role.Customer), WishlistInfrastructureController.addToWishList) // ---> addToWishList(bookId : string)
router.get('/wishlist', checkRole(Role.Customer), WishlistInfrastructureController.getAll) // ---> getAll()
router.delete('/delete', checkRole(Role.Customer),  WishlistInfrastructureController.cleanWishList) // ---> cleanWishList()
router.delete('/delete/:bookId', checkRole(Role.Customer), WishlistInfrastructureController.deleteFromWishList) // ---> delete()
export default router