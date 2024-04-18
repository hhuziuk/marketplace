import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import PublisherInfrastructureController from "../controllers/PublisherInfrastructureController";
const router = express.Router();

router.post('/add', checkRole(Role.Admin), PublisherInfrastructureController.addPublisher) // ---> addPublisher()
router.get('/:publisherId', checkRole(Role.Admin, Role.Seller, Role.Customer), PublisherInfrastructureController.getById) // ---> getById()
router.get('/name/:publisherName', checkRole(Role.Admin, Role.Seller, Role.Customer), PublisherInfrastructureController.getByName) // ---> getByName()
router.get('/', checkRole(Role.Admin, Role.Seller, Role.Customer), PublisherInfrastructureController.getAll) // ---> getAll()
router.put('/update/:publisherId', checkRole(Role.Admin), PublisherInfrastructureController.update) // ---> ???? update() for implementation
router.delete('/delete/:publisherId', checkRole(Role.Admin), PublisherInfrastructureController.delete) // ---> delete()

export default router