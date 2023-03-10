import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
const router = express.Router();

router.post('/add', ) // ---> addRating()
router.put('/update/:ratingId', ) // ---> update(id)
router.get('/ratings', ) // ---> getAll()
router.delete('/delete/:ratingId', checkRole(Role.Admin) ) // ---> delete()

export default router