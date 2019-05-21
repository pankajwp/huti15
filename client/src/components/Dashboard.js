import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SurveyLists from './surveys/SurveyLists';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {
  state = {sortSurveyVal: 'asc'};

  render () {
    return (
      <div>
        <nav>
          <div className="nav-wrapper" style={{marginTop: '10px'}}>
            <div className="col s12">
              <button
                onClick={() => {
                  this.props.sortSurvey (this.state.sortSurveyVal);
                  let sortedType = this.state.sortSurveyVal === 'asc'
                    ? 'desc'
                    : 'asc';
                  this.setState ({sortSurveyVal: sortedType});
                }}
                style={{marginLeft: '10px'}}
                className="btn breadcrumb"
              >
                Sort By Survey
              </button>
            </div>
          </div>
        </nav>
        <SurveyLists />
        <div className="fixed-action-btn">
          <Link to="/surveys/new" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect (null, actions) (Dashboard);
