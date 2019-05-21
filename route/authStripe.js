const keys = require ('../config/keys');
const stripe = require ('stripe') (keys.stripeSecretkey);
const requestLogin = require ('../middlewares/requestLogin');

module.exports = app => {

  app.post ('/api/stripe', requestLogin, async (req, res) => {
    // console.log (keys.stripeSecretKey);    
    // process.exit(1);
    const resData = await stripe.charges.create ({
      amount: 80,
      currency: 'usd',
      source: req.body.id, // obtained with Stripe.js
      description: 'Charge for jenny.rosen@example.com',
    });
    // console.log(resData);process.exit(2);
    if (resData.paid === true) {
      req.user.credit += 5;
      const userData = await req.user.save ();
      res.send (userData);
    }
  });
};
