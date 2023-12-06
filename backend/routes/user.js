import express from 'express';
import userControllers from '../controllers/user.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', userControllers.register);
router.post('/login', userControllers.login);
router.get('/:id', userControllers.getMe);
router.post('/logout', userControllers.logout);

export default router;
