// production keys here
// Google keys from Main google account project Emaily Prod
// sendgrid api key: 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
module.exports = {
  googleClientID: process.env.googleClientID,
  googleClientSecret: process.env.googleClientSecret,
  mUri: process.env.mUri,
  cookieKey: process.env.cookieKey,
  stripeSecretkey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};
