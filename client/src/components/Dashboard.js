import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SurveyLists from './surveys/SurveyLists';

class Dashboard extends Component {
  componentDidMount () {}

  render () {
    return (
      <div>
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

export default Dashboard;
