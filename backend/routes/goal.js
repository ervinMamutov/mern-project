import express from 'express';
import goalControllers from '../controllers/goal.js';
const router = express.Router();

router.get('/', goalControllers.getGoal);
router.post('/', goalControllers.addGoal);
router.put('/:id', goalControllers.updateGoal);
router.delete('/:id', goalControllers.deleteGoal);

export default router;
