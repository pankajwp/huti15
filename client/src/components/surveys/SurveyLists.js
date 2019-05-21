import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys, deleteSurvey} from '../../actions';

class SurveyLists extends Component {
  componentDidMount () {
    this.props.fetchSurveys ();
  }

  renderSurveys () {
    return this.props.surveys.reverse ().map (survey => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <button
              onClick={() => this.props.deleteSurvey (survey._id)}
              className="btn-flat btn-danger right white-text"
            >
              Delete
            </button>
          </div>
          <div className="card-action">
            <button className="btn-flat button-success white-text">
              Yes: {survey.yes}
            </button>
            <button className="btn-flat button-success white-text">
              No: {survey.no}
            </button>
          </div>
        </div>
      );
    });
  }

  render () {
    return <div>{this.renderSurveys ()}</div>;
  }
}

function mapStatesToProps({surveys}) {
  return {surveys};
}

export default connect (mapStatesToProps, {fetchSurveys, deleteSurvey}) (
  SurveyLists
);
