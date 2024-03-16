import express from "express"
const router = express.Router();

router.post('/add', ) // ---> addPublisher()
router.get('/publisher/:publisherId', ) // ---> getById()
router.get('/publisher/:publisherName', ) // ---> getByName()
router.get('/', ) // ---> getAll()
router.put('/publisher/:publisherId', ) // ---> ???? update() for implementation
router.delete('/publisher/:publisherId', ) // ---> delete()

export default router