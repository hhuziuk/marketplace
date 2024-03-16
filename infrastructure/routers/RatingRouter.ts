import express from "express"
const router = express.Router();

router.post('/add', ) // ---> addRating()
router.put('/update/:ratingId', ) // ---> update(id)
router.get('/ratings', ) // ---> getAll()
router.delete('/delete/:ratingId', ) // ---> delete()

export default router