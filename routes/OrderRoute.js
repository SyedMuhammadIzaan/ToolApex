import express from 'express';
import {
  createOrder,
  getAllOrders,
  updateOrderById,
  deleteOrderById,
} from '../controller/OrderController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/admin/users/create-order', protect ,createOrder);
router.get('/', getAllOrders);
router.put('/admin/users/:id',  protect,updateOrderById);
router.delete('/admin/users/:id', protect,deleteOrderById);

export default router;
