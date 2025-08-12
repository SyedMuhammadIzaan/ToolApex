import {
  createOrderService,
  getAllOrdersService,
  updateOrderByIdService,
  deleteOrderByIdService,
} from '../services/OrderService.js';

import { orderSchemaValidation } from '../validators/OrderValidation.js';
import { createPaypalOrder } from './PaypalController.js';

export const createOrder = async (req, res) => {
  const { error } = orderSchemaValidation.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((err) => err.message),
    });
  }

  try {
    const newOrder = await createOrderService(req.body);
    const {total}=req.body;
    const orderId=await createPaypalOrder(total)
    res.status(201).json({ message: 'Order created successfully', order: orderId });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const getAllOrders = async (_req, res) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const updateOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrder = await updateOrderByIdService(id, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order updated', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteOrderByIdService(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
