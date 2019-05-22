import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {reduxForm, Field, getFormValues} from 'redux-form';
import SurveyFields from './SurveyFields';
import validateEmail from '../../utils/validateEmails';
import FormFields from './formFieldOb';
import {connect} from 'react-redux';
import {draftSurvey} from '../../actions';

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

  draftSavedStatus () {
    switch (this.props.draftData) {
      case null:
        return;
      default:
        return (
          <div>
            this.props.draftData.message;
          </div>
        );
    }
  }

  render () {
    // handleSubmit function provided to us by reduxForm helper wired in the bottom
    return (
      <div>
        <form onSubmit={this.props.handleSubmit (this.props.onSurveySubmit)}>
          {this.renderFields ()}
          <Link to="/surveys" className="btn-flat white-text red">
            Cancel
          </Link>&nbsp;
          <button
            type="button"
            onClick={() => {
              this.props.draftSurvey (this.props.formValues);
            }}
            className="yellow btn-flat center white-text darken-3"
          >
            Save as Draft
          </button>
          {this.draftSavedStatus ()}
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

function mapStateToProps (state) {
  return {
    formValues: getFormValues ('reduxFormData') (state),
    draftData: state.drafts,
  };
}

export default reduxForm ({
  destroyOnUnmount: false,
  validate,
  form: 'reduxFormData',
}) (connect (mapStateToProps, {draftSurvey}) (SurveyForm));
