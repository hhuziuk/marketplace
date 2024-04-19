import express from "express"
import {checkRole} from "../middleware/RoleMiddleware";
import {Role} from "../../core/domain/enums/Role";
import FavoriteInfrastructureController from "../controllers/FavoriteInfrastructureController";

const router = express.Router();

router.post('/add', checkRole(Role.Customer), FavoriteInfrastructureController.addToFavorite) // ---> addToFavorite()
router.get('/favorites', checkRole(Role.Customer), FavoriteInfrastructureController.getAll) // ---> getAll() for implementation!
router.delete('/deleteFromFavorite/:bookId', checkRole(Role.Customer), FavoriteInfrastructureController.deleteFromFavorite) // ---> deleteFromFavorite()

export default router