// services/orderService.js
import Order from '../models/OrderModel.js';

export const createOrderService = async (orderData) => {
  return await Order.create(orderData);
};

export const getAllOrdersService = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

export const updateOrderByIdService = async (orderId, updateData) => {
  return await Order.findByIdAndUpdate(orderId, updateData, { new: true });
};

export const deleteOrderByIdService = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};
