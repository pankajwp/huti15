import _ from 'lodash';
import React from 'react';
//connect is used to pull data out of redux and use it in our component
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import FormFields from './formFieldOb';
import * as actions from '../../actions';
// history coming from withRouter object
const SurveyFormReview = ({onCancel, formData, submitSurvey, history}) => {
  // console.log (FormFields);
  const fields = _.map (FormFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <h3>{formData[field.name]}</h3>
      </div>
    );
  });

  return (
    <div>
      {fields}
      <button
        type="submit"
        className="btn-flat darken-3 yellow white-text"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey (formData, history)}
        className="right btn-flat green darken-3 white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps (props) {
  // console.log (props.form);
  return {formData: props.form.reduxFormData.values};
}

export default connect (mapStateToProps, actions) (
  withRouter (SurveyFormReview)
);
