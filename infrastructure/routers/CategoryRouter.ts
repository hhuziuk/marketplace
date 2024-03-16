import express from "express"
const router = express.Router();

router.post('/add', ) // ---> addPublisher()
router.get('/:publisherId', ) // ---> getById()
router.get('/name/:publisherName', ) // ---> getByName()
router.get('/', ) // ---> getAll()
router.put('/:publisherId', ) // ---> ???? update() for implementation
router.delete('/:publisherId', ) // ---> delete()


export default router