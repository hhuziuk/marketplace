import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
const router = express.Router();

router.post('/add', checkRole(Role.Admin) ) // ---> addPublisher()
router.get('/:publisherId', ) // ---> getById()
router.get('/name/:publisherName', ) // ---> getByName()
router.get('/', ) // ---> getAll()
router.put('/:publisherId', checkRole(Role.Admin) ) // ---> ???? update() for implementation
router.delete('/:publisherId', checkRole(Role.Admin) ) // ---> delete()


export default router