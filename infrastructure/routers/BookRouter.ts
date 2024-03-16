import express from "express"
const router = express.Router();

router.post('/add', ) // ---> create()
router.get('/books', ) // ---> getAll()
router.get('/:bookId', ) // ---> getById()
router.get('/author/:bookAuthor', ) // ---> getByAuthor()
router.get('/name/:bookName', ) // ---> getByName()
router.put('/update/:bookId', ) // ---> for implementation
router.delete('/delete/:bookId', ) // ---> delete()

export default router