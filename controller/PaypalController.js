import { client } from '../config/paypal.js';
import paypal from '@paypal/checkout-server-sdk';
import Order from '../models/OrderModel.js';
// import { orderSchemaValidation } from '../validators/OrderValidation.js';

export const createPaypalOrder = async (total) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: total.toFixed(2),
      },
    }],
  });

  try {
    const order = await client.execute(request);
    return order.result.id
    // res.json({ orderID: order.result.id });
  } catch (err) {
    throw err;
}
}

export const capturePayment = async (req, res) => {
  try {
    const { paypalOrderId, orderId } = req.body;

    // 1. Capture payment
    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});
    const capture = await client().execute(request);

    // 2. Update order with payment result
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.paymentResult = {
      id: capture.result.id,
      status: capture.result.status,
      payerName: `${capture.result.payer.name.given_name} ${capture.result.payer.name.surname}`,
      email: capture.result.payer.email_address
    };
    await order.save();

    res.json({ message: 'Payment captured successfully', capture });
  } catch (error) {
    res.status(500).json({ message: 'Payment capture failed', error: error.message });
  }
};