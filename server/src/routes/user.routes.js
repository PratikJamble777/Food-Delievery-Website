import { Router } from 'express';
import { deleteUser, listUsers, updateUser } from '../controllers/user.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect, adminOnly);
router.get('/', listUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
