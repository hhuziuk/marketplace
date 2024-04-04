import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import PublisherInfrastructureController from "../controllers/PublisherInfrastructureController";
const router = express.Router();

router.post('/add', checkRole(Role.Admin), PublisherInfrastructureController.addPublisher) // ---> addPublisher()
router.get('/publisher/:publisherId', checkRole(Role.Admin), checkRole(Role.Seller), checkRole(Role.Customer), PublisherInfrastructureController.getById) // ---> getById()
router.get('/publisher/:publisherName', checkRole(Role.Admin), checkRole(Role.Seller), checkRole(Role.Customer), PublisherInfrastructureController.getByName) // ---> getByName()
router.get('/', checkRole(Role.Admin), checkRole(Role.Seller), checkRole(Role.Customer), PublisherInfrastructureController.getAll) // ---> getAll()
router.put('/publisher/:publisherId', checkRole(Role.Admin), PublisherInfrastructureController.update) // ---> ???? update() for implementation
router.delete('/publisher/:publisherId', checkRole(Role.Admin), PublisherInfrastructureController.delete) // ---> delete()

export default router