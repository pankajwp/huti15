import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import SurveyFields from './SurveyFields';
import validateEmail from '../../utils/validateEmails';
import FormFields from './formFieldOb';

class SurveyForm extends Component {
  renderFields () {
    return _.map (FormFields, field => {
      return (
        <Field
          key={field.name}
          component={SurveyFields}
          name={field.name}
          label={field.label}
          type="text"
        />
      );
    });
  }

  render () {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit (this.props.onSurveySubmit)}>
          {this.renderFields ()}
          <Link to="/surveys" className="btn-flat white-text red">Cancel</Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate (value) {
  let error = {};

  error.recipients = validateEmail (value.recipients || '');

  _.map (FormFields, field => {
    if (!value[field.name]) {
      error[field.name] = 'Please enter a value for ' + [field.label];
    }
  });

  return error;
}

export default reduxForm ({
  destroyOnUnmount: false,
  validate,
  form: 'reduxFormData',
}) (SurveyForm);
