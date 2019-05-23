import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Popup extends Component {
  render () {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="row">
            <div className="col s12 m12">
              <div className="card blue-grey darken-1">
                <button
                  className="btn btn-flat white-text right"
                  onClick={this.props.closePopup}
                >
                  close me
                </button>
                <div className="card-content white-text">
                  <span className="card-title">Warning</span>
                  <p>
                    You have some draft surveys saved , do you want to continue editing those or you want to add a new one ?
                  </p>
                </div>
                <div className="card-action">
                  <Link to="/surveys/draft">View Drafts</Link>
                  <Link to="/surveys/new">Add New</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
