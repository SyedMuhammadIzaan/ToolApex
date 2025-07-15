import { client } from '../config/paypal.js';
import paypal from '@paypal/checkout-server-sdk';
import Order from '../models/OrderModel.js';
import { orderSchemaValidation } from '../validators/OrderValidation.js';

export const createPaypalOrder = async (req, res) => {
  const { total } = req.body;

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
    res.json({ orderID: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create PayPal order' });
  }
};

export const capturePaypalOrder = async (req, res) => {
  const { orderID, orderData } = req.body;

  const validation = orderSchemaValidation.validate(orderData, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validation.error.details.map(err => err.message),
    });
  }

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    const paymentDetails = capture.result;

    const newOrder = await Order.create({
      ...orderData,
      paymentResult: {
        id: paymentDetails.id,
        status: paymentDetails.status,
        payerName: paymentDetails.payer.name.given_name,
        email: paymentDetails.payer.email_address,
      },
    });

    res.status(201).json({
      message: 'Order created and payment captured',
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to capture PayPal order', error: err.message });
  }
};
