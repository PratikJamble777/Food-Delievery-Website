import { Router } from 'express';
import { createFood, deleteFood, getFood, listFoods, updateFood } from '../controllers/food.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';
import { requireFields } from '../middleware/validate.js';

const router = Router();

router.get('/', listFoods);
router.get('/:id', getFood);
router.post('/', protect, adminOnly, requireFields('restaurant_id', 'name', 'description', 'image', 'price', 'category'), createFood);
router.patch('/:id', protect, adminOnly, updateFood);
router.delete('/:id', protect, adminOnly, deleteFood);

export default router;
