import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
const router = express.Router();

router.post('/add', checkRole(Role.Seller) ) // ---> create()
router.get('/books', ) // ---> getAll()
router.get('/:bookId', ) // ---> getById()
router.get('/author/:bookAuthor', ) // ---> getByAuthor()
router.get('/name/:bookName', ) // ---> getByName()
router.put('/update/:bookId', checkRole(Role.Seller) ) // ---> for implementation
router.delete('/delete/:bookId', checkRole(Role.Admin), checkRole(Role.Seller) ) // ---> delete()

export default router