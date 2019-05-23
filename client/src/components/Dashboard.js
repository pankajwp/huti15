import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SurveyLists from './surveys/SurveyLists';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Popup from '../utils/Popup';

class Dashboard extends Component {
  constructor () {
    super ();
    this.state = {sortSurveyVal: 'asc', showPopUp: false};
    this.togglePopup = this.togglePopup.bind (this);
  }

  togglePopup () {
    this.setState ({showPopUp: !this.state.showPopUp});
  }

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
        <div className="action-btn">
          <button
            onClick={() => this.togglePopup ()}
            className="waves-effect waves-light btn modal-trigger"
          >
            <i className="material-icons">aspect_ratio</i>
          </button>
        </div>
        <SurveyLists />
        <div className="fixed-action-btn">
          <Link to="/surveys/new" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
        {this.state.showPopUp
          ? <Popup text="close" closePopup={this.togglePopup} />
          : null}
      </div>
    );
  }
}

export default connect (null, actions) (Dashboard);
