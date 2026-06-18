import { Router } from 'express';
import { login, profile, register } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireFields } from '../middleware/validate.js';

const router = Router();

router.post('/register', requireFields('name', 'email', 'mobile', 'password'), register);
router.post('/login', requireFields('email', 'password'), login);
router.get('/profile', protect, profile);

export default router;
