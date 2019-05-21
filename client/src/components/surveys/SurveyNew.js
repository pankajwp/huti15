import React, {Component} from 'react';
import SurveyForm from './SurveyForm';
import FormReview from './formReview';
import {reduxForm} from 'redux-form';

class SurveyNew extends Component {
  // as the setup is through create-react-app, which has babble as on of its library so we can setup state without
  // using constructor function also

  state = {showFormReview: false};

  renderForm () {
    if (this.state.showFormReview) {
      return (
        <FormReview onCancel={() => this.setState ({showFormReview: false})} />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState ({showFormReview: true})}
      />
    );
  }

  render () {
    return (
      <div>
        {this.renderForm ()}
      </div>
    );
  }
}

export default reduxForm ({
  form: 'reduxFormData',
}) (SurveyNew);
