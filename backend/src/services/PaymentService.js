const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCustomer = async (email, name) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
};

const createCharge = async (customerId, amount, currency = 'usd') => {
  try {
    const charge = await stripe.charges.create({
      customer: customerId,
      amount,
      currency,
      description: 'Service charge',
    });
    return charge;
  } catch (error) {
    console.error('Error creating Stripe charge:', error);
    throw error;
  }
};

module.exports = {
  createCustomer,
  createCharge,
};
