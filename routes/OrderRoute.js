import express from 'express';
import {
  createOrder,
  getAllOrders,
  updateOrderById,
  deleteOrderById,
} from '../controller/OrderController.js';
import protect from '../middleware/authMiddleware.js';
import { capturePayment } from '../controller/PaypalController.js';

const router = express.Router();

router.post('/admin/users/create-order', protect ,createOrder);
router.get('/', getAllOrders);
router.post('/capture-payment', capturePayment);
router.put('/admin/users/:id',  protect,updateOrderById);
router.delete('/admin/users/:id', protect,deleteOrderById);

export default router;
