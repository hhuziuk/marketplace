import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import RatingInfrastructureController from "../controllers/RatingInfrastructureController";
const router = express.Router();

router.post('/add', checkRole(Role.Customer), RatingInfrastructureController.addRating) // ---> addRating()
//router.put('/update/:ratingId', checkRole(Role.Customer), RatingInfrastructureController.update) // ---> update(id)
router.get('/ratings', checkRole(Role.Admin), checkRole(Role.Customer), checkRole(Role.Seller), RatingInfrastructureController.getAll) // ---> getAll()
router.delete('/delete/:ratingId', checkRole(Role.Customer), checkRole(Role.Admin), RatingInfrastructureController.delete) // ---> delete()

export default router