import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as combinedActions from '../../../store/actions';
import withRouterHOC from '../../../hoc/withRouterHOC';
import * as apiSupllies from '../../../supplies/apiSupplies';
import Login from './Login';

class LoggedInOk extends Component {
 componentDidMount = () => {
  this.handleLogin3rd();
 };

 handleLogin3rd = () => {
  const { router } = this.props;
  const { refreshToken, accessToken, sessionToken, user } = router.params;
  if (refreshToken && accessToken && sessionToken && user) {
   const result = {
    ...apiSupllies.apiStates.noErrors,
    accessToken,
    user: JSON.parse(user),
   };
   this.props.getDataFrom3rdFn(result);
  }
 };

 render() {
  return <>{this.props.isLoggedIn && <Login />}</>;
 }
}

const mapStateToProps = ({ userReducer }) => ({
 isLoggedIn: userReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
 getDataFrom3rdFn: (info) => dispatch(combinedActions.getDataFrom3rdFn(info)),
});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(LoggedInOk);
