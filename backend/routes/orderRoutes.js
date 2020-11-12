import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
// make sure this is at the bottom, so that when it looks at what's afte / it's an ID
router.route('/:id').get(protect, getOrderById);

export default router;
