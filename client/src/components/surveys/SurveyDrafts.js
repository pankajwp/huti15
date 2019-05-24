import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SurveyDrafts extends Component{

    componentDidMount(){
        this.props.fetchDraftSurveys();
    }

    render(){
        return(
            <div>
                <h2>Survey Draft Lists</h2>
            </div>
        )
    }

}

export default connect(null, actions)(SurveyDrafts);