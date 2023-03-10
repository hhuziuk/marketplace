import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
const router = express.Router();

router.post('/add', checkRole(Role.Customer) ) // ---> addToWishList(bookId : string)
router.get('/wishlist', checkRole(Role.Customer) ) // ---> getAll()
router.delete('/delete', checkRole(Role.Customer) ) // ---> cleanWishList()

export default router