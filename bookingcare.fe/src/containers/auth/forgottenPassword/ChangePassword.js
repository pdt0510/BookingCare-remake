import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ChangePassword.scss';
import HomeHeader from '../../patient/homePage/homeHeader/HomeHeader';
import * as combinedActions from '../../../store/actions';
import { compose } from 'redux';
import withRouterHOC from '../../../hoc/withRouterHOC';
import { paths } from '../../../supplies/routeSupplies';
import ForgottenModal from './forgottenModal/ForgottenModal';
import jwt_decode from 'jwt-decode';

class ChangePassword extends Component {
 state = {
  message: null,
 };

 componentDidUpdate = (prevProps, prevState) => {
  if (this.state.message) {
   this.props.router.navigate(paths.main, { replace: true });
  }
 };

 render() {
  let expTime = 0;
  let isRender = true;
  const currentTime = Date.now() / 1000;
  const { token } = this.props.router.params;

  if (token) expTime = jwt_decode(token).exp;
  if (currentTime > expTime) isRender = false;

  return (
   <div className='changePassword-content'>
    <HomeHeader />
    {isRender && <ForgottenModal isResetPassword={true} />}
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer }) => {
 return {
  isLoggedIn: appReducer.isLoggedIn,
 };
};

const mapDispatchToProps = (dispatch) => ({
 toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
 getPatientTokenForConfirmFn: (info) => dispatch(combinedActions.getPatientTokenForConfirmFn(info)),
});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(ChangePassword);
