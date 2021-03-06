import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS, DRAFT_SURVEYS, FETCH_SAVED_DRAFT} from './type';

export const fetchUser = () => async dispatch => {
  const res = await axios.get ('/api/get_user');
  dispatch ({type: FETCH_USER, payload: res.data});
};

export const handleStripe = token => async dispatch => {
  const res = await axios.post ('/api/stripe', token);
  dispatch ({type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post ('/api/surveys', values);
  dispatch ({type: FETCH_USER, payload: res.data});
  history.push ('/surveys');
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get ('/api/surveys');
  dispatch ({type: FETCH_SURVEYS, payload: res.data});
};

export const deleteSurvey = surveyId => async dispatch => {
  const res = await axios.post ('/api/survey_delete', {surveyId: surveyId});
  dispatch ({type: FETCH_SURVEYS, payload: res.data});
};

export const draftSurvey = formValues => async dispatch => {
  const res = await axios.post ('/api/survey_draft', {formValues});
  dispatch ({type: DRAFT_SURVEYS, payload: res.data});
};

export const fetchDraftSurveys = () => async dispatch => {
  const res = axios.get('/api/survey_drafts');
  dispatch({type:FETCH_SAVED_DRAFT, payload: res.data})
}

export const sortSurvey = sortBy => async dispatch => {
  const res = await axios.get ('/api/surveys', {
    headers: {
      'Content-Type': 'application/json',
      sort_by: `${sortBy}`,
    },
  });
  dispatch ({type: FETCH_SURVEYS, payload: res.data});
};
