import express from "express"
import {Book} from "../../core/domain/Book";
const router = express.Router();

router.post('/add', ) // ---> addToWishList(bookId : string)
router.get('/wishlist', ) // ---> getAll()
router.delete('/delete', ) // ---> cleanWishList()

export default router