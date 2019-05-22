const express = require ('express');
const mongoose = require ('mongoose');
const cookieSession = require ('cookie-session');
const passport = require ('passport');
const bodyParser = require ('body-parser');
const keys = require ('./config/keys');

mongoose.connect (keys.mUri, {useNewUrlParser: true});

const app = express ();
app.use (bodyParser.json ());
app.use (
  cookieSession ({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey],
  })
);
// Tell passport to use session
app.use (passport.initialize ());
app.use (passport.session ());

require ('./models/user');
require ('./models/Survey');
require ('./models/SurveyDraft');
require ('./route/authRoute') (app);
require ('./route/authStripe') (app);
require ('./route/surveyRoute') (app);
require ('./service/passport');

if (process.env.NODE_ENV == 'production') {
  app.use (express.static ('client/build'));

  //Express will server index.html if any requested route is not defined in the server
  const path = require ('path');
  app.get ('*', (req, res) => {
    res.sendFile (path.resolve (__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen (PORT);
