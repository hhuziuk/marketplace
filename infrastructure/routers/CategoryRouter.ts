import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import CategoryInfrastructureController from "../controllers/CategoryInfrastructureController";
const router = express.Router();

router.post('/add', checkRole(Role.Admin), CategoryInfrastructureController.addCategory) // ---> addPublisher()
router.get('/:publisherId', CategoryInfrastructureController.getById) // ---> getById()
router.get('/name/:publisherName', CategoryInfrastructureController.getByName) // ---> getByName()
router.get('/', CategoryInfrastructureController.getAll) // ---> getAll()
router.put('/:publisherId', checkRole(Role.Admin), CategoryInfrastructureController.update) // ---> ???? update() for implementation
router.delete('/:publisherId', checkRole(Role.Admin), CategoryInfrastructureController.delete) // ---> delete()


export default router