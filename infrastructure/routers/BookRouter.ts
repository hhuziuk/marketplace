import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import BookInfrastructureController from "../controllers/BookInfrastructureController";
const router = express.Router();

router.post('/add', checkRole(Role.Seller), BookInfrastructureController.create ) // ---> create()
router.get('/books', BookInfrastructureController.getAll) // ---> getAll()
router.get('/:bookId', BookInfrastructureController.getById) // ---> getById()
router.get('/author/:bookAuthor', BookInfrastructureController.getByAuthor) // ---> getByAuthor()
router.get('/name/:bookName', BookInfrastructureController.getByName) // ---> getByName()
router.put('/update/:bookId', checkRole(Role.Seller), BookInfrastructureController.update) // ---> for implementation
router.delete('/delete/:bookId', checkRole(Role.Admin, Role.Seller), BookInfrastructureController.delete) // ---> delete()

export default router