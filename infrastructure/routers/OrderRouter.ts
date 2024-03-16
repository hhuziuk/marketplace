import express from "express"
const router = express.Router();

router.post('/add', ) // ---> createOrder()
router.post('/confirm', ) // ---> confirmOrder()
router.get('/orders', ) // ---> getAll() for implementation!
router.get('/:orderId', ) // ---> getById() for implementation!
router.put('/setStatus', ) // ---> setStatus()
router.delete('/cancelOrder', ) // ---> cancelOrder()

export default router