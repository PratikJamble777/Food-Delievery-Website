import { Router } from 'express';
import { addItem, clearCart, getCart, removeItem, updateItem } from '../controllers/cart.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireFields } from '../middleware/validate.js';

const router = Router();

router.use(protect);
router.get('/', getCart);
router.post('/', requireFields('food_id'), addItem);
router.patch('/:foodId', requireFields('quantity'), updateItem);
router.delete('/:foodId', removeItem);
router.delete('/', clearCart);

export default router;
