import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import CategoryInfrastructureController from "../controllers/CategoryInfrastructureController";
const router = express.Router();

router.post('/add', checkRole(Role.Admin), CategoryInfrastructureController.addCategory) // ---> addPublisher()
router.get('/:categoryId', CategoryInfrastructureController.getById) // ---> getById()
router.get('/name/:categoryName', CategoryInfrastructureController.getByName) // ---> getByName()
router.get('/categories', CategoryInfrastructureController.getAll) // ---> getAll()
router.put('/:categoryId', checkRole(Role.Admin), CategoryInfrastructureController.update) // ---> ???? update() for implementation
router.delete('/:categoryId', checkRole(Role.Admin), CategoryInfrastructureController.delete) // ---> delete()


export default router