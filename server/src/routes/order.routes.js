import { Router } from 'express';
import { createOrder, deleteOrder, getOrder, listOrders, updateOrder } from '../controllers/order.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);
router.get('/', listOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.patch('/:id', adminOnly, updateOrder);
router.delete('/:id', adminOnly, deleteOrder);

export default router;
