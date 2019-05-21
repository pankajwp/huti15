// sendgrid prod api key: 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
// sendgrid dev api key: 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
const mongoose = require ('mongoose');
const _ = require ('lodash');
const {Path} = require ('path-parser');
const {URL} = require ('url');
const RequestLogin = require ('../middlewares/requestLogin');
const RequestCredential = require ('../middlewares/requestCredential');
const Mailer = require ('../service/Mailer');
const surveyTemplate = require ('../service/emailTemplates/surveyTemplate');

const Survey = mongoose.model ('surveys');

module.exports = app => {
  app.get ('/api/surveys', RequestLogin, async (req, res) => {
    const surveyLists = await Survey.find ({_user: req.user.id}).select ({
      recipients: false,
    });
    res.send (surveyLists);
  });

  app.get ('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send ('Thank you for your feedback');
  });

  app.post ('/api/survey_delete', RequestLogin, async (req, res) => {
    const surveyId = req.body.surveyId;
    const deleteSurvey = await Survey.deleteOne ({_id: surveyId});
    const surveyLists = await Survey.find ({_user: req.user.id}).select ({
      recipients: false,
    });
    res.send (surveyLists);
  });

  app.post ('/api/surveys/webhooks', (req, res) => {
    // console.log (req.body);
    const p = new Path ('/api/surveys/:surveyId/:choice');
    _.chain (req.body)
      .map (({email, url}) => {
        const match = p.test (new URL (url).pathname); // p.test can also be null in case surveid or choice is not found
        if (match) {
          return {email, surveyId: match.surveyId, choice: match.choice};
        }
      })
      .compact () // in order to remove any undefined elements inside the array
      .uniqBy ('email', 'surveyId') // remove any element with duplicate email or survey id
      .each (({surveyId, email, choice}) => {
        console.log (choice);
        Survey.updateOne (
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {email: email, responded: false},
            },
          },
          {
            $inc: {[choice]: 1},
            $set: {'recipients.$.responded': true},
          }
        ).exec ();
      })
      .value ();

    res.status (202).send ({});
  });

  app.post (
    '/api/surveys',
    RequestLogin,
    RequestCredential,
    async (req, res) => {
      const {title, subject, body, recipients, from} = req.body;
      // res.send (from);
      // process.exit (22);
      const survey = new Survey ({
        title,
        subject,
        body,
        from,
        recipients: recipients
          .split (',')
          .map (email => ({email: email.trim ()})),
        _user: req.user.id,
        dateSent: Date.now (),
      });

      const mailer = new Mailer (survey, surveyTemplate (survey));
      try {
        await mailer.send ();
        await survey.save ();
        req.user.credit -= 1;
        const userData = await req.user.save ();
        res.send (userData);
      } catch (err) {
        res.status (422).send (err);
      }
    }
  );
};
