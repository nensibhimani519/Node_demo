// This is your test secret API key.
const stripe = require('stripe')('sk_test_51MKwTCSHo5taEDLVLNK4FeM9sKSDaFsYuC6AT8mGLWfAq8CbzNwVwA9PJSHOOvK80XY4Z1xX3tsaXX3PuyR52tSM00umXFvPPU');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));