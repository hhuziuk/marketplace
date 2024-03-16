import express from "express"
const router = express.Router();

router.post('/add', ) // ---> addPublisher()
router.get('/:publisherId', ) // ---> getById()
router.get('/:publisherName', ) // ---> getByName()
router.get('/', ) // ---> getAll()
router.put('/', ) // ---> ???? update() for implementation
router.delete('/:id', ) // ---> delete()

export default router