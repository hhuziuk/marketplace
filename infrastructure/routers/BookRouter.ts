import express from "express"
const router = express.Router();

router.post('/add', ) // ---> create()
router.get('/books', ) // ---> getAll()
router.get('/:bookId', ) // ---> getById()
router.get('/:bookAuthor', ) // ---> getByAuthor()
router.get('/:bookName', ) // ---> getByName()
router.update('/update', ) // ---> for implementation
router.delete('/delete', ) // ---> delete()

export default router