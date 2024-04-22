import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import BookInfrastructureController from "../controllers/BookInfrastructureController";
import {verify} from "../middleware/VerifyMiddlware";

const router = express.Router();

router.post('/add', verify(), checkRole(Role.Seller, Role.Admin), BookInfrastructureController.create) // ---> create()
router.get('/books', checkRole(Role.Seller, Role.Customer, Role.Admin), BookInfrastructureController.getAll) // ---> getAll()
router.get('/:bookId', checkRole(Role.Seller, Role.Customer, Role.Admin), BookInfrastructureController.getById) // ---> getById()
router.get('/author/:bookAuthor', checkRole(Role.Seller, Role.Customer, Role.Admin), BookInfrastructureController.getByAuthor) // ---> getByAuthor()
router.get('/name/:bookName', checkRole(Role.Seller, Role.Customer, Role.Admin), BookInfrastructureController.getByName) // ---> getByName()
router.put('/update/:bookId', checkRole(Role.Seller), BookInfrastructureController.update) // ---> for implementation
router.delete('/delete/:bookId', checkRole(Role.Seller, Role.Admin), BookInfrastructureController.delete) // ---> delete()

export default router