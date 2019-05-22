import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import fetchSurvey from './surveysReducer';
import draftSurvey from './draftReducer';

export default combineReducers ({
  auth: authReducer,
  form: formReducer,
  surveys: fetchSurvey,
  drafts: draftSurvey,
});
