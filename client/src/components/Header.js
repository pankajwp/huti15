import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';

class Header extends Component {
  checkLoggedUser () {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>;
      default:
        return [
          <li key={1}>
            <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_KEY}
              amount={80}
              currency="USD"
              name="Emaily"
              description="Pay per Credit"
              token={token => this.props.handleStripe (token)}
            >
              <button className="btn btn-primary">
                Add Credits
              </button>
            </StripeCheckout>
          </li>,
          <li key={3}>
            <a className="btn btn-sm btn-success">
              {this.props.auth.credit}
            </a>
          </li>,
          <li key={4}>
            <Link to="/surveys" className="btn btn-success">
              Dashboard
            </Link>
          </li>,
          <li key={2}><a href="/api/logout">Logout</a></li>,
        ];
    }
  }

  render () {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            style={{marginLeft: '10px'}}
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Survey
          </Link>
          <ul id="nav-mobile" className="right">
            {this.checkLoggedUser ()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps, actions) (Header);
