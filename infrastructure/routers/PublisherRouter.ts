import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
const router = express.Router();

router.post('/add', checkRole(Role.Admin) ) // ---> addPublisher()
router.get('/publisher/:publisherId', ) // ---> getById()
router.get('/publisher/:publisherName', ) // ---> getByName()
router.get('/', ) // ---> getAll()
router.put('/publisher/:publisherId', checkRole(Role.Admin) ) // ---> ???? update() for implementation
router.delete('/publisher/:publisherId', checkRole(Role.Admin) ) // ---> delete()

export default router