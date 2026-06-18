import { Router } from 'express';
import { createRestaurant, deleteRestaurant, getRestaurant, listRestaurants, updateRestaurant } from '../controllers/restaurant.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';
import { requireFields } from '../middleware/validate.js';

const router = Router();

router.get('/', listRestaurants);
router.get('/:id', getRestaurant);
router.post('/', protect, adminOnly, requireFields('name', 'image', 'cuisine'), createRestaurant);
router.patch('/:id', protect, adminOnly, updateRestaurant);
router.delete('/:id', protect, adminOnly, deleteRestaurant);

export default router;
