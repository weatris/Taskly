import express from 'express';
const router = express.Router();
import userService from '../services/user.js';

router.post('/', userService.createUser);
router.get('/:id', userService.getUserById);
router.post('/login', userService.login);

router.put('/:id', userService.authenticate, userService.updateUser);
router.delete('/:id', userService.authenticate, userService.deleteUser);
router.get('/refresh', userService.authenticate, userService.updateUser);

export default router;
