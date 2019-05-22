const mongoose = require ('mongoose');
const {Schema} = mongoose;

const SurveyDraft = new Schema ({
  title: String,
  subject: String,
  from: String,
  body: String,
  recipients: String,
});

mongoose.model ('surveyDraft', SurveyDraft);
