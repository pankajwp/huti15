import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyDrafts from './surveys/SurveyDrafts';
const SurveyThanks = () => <h1>Thanks for your feedback !</h1>;

class App extends Component {
  componentDidMount () {
    this.props.fetchUser ();
  }

  render () {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <div>
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/survey/thanks" component={SurveyThanks} />
            <Route path="/surveys/draft" component={SurveyDrafts} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect (null, actions) (App);
