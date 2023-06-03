import React, { Component } from 'react';
import './MenuGroup.scss';
import { FormattedMessage } from 'react-intl';
import SubMenu from '../subMenu/SubMenu';
import * as varConsts from '../../../../utilities/constant';
import withRouterHOC from '../../../../hoc/withRouterHOC';
import * as routeSupplies from '../../../../supplies/routeSupplies';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as constVals from '../../../../utilities/index';

class MenuGroup extends Component {
 componentDidMount = () => {
  this.setState({});
 };

 renderMenuGroup = () => {
  const { menu, router } = this.props;
  const { activeClass, menuGroupClass } = varConsts.nameKeysValues;

  let usingPath = router.location.pathname;
  let defaultPath = this.getDefaultPathForNav(usingPath);

  if (defaultPath) {
   return (
    <Navigate
     to={defaultPath}
     replace
    />
   );
  } else {
   let noTriggered = true;
   const tempList = menu.map((item, idx) => {
    let isThisRoute = false;

    if (noTriggered) {
     isThisRoute = this.getActivePath(item.subMenu, usingPath);
     if (isThisRoute) noTriggered = false;
    }

    return (
     <div
      id={idx}
      key={idx}
      className={`${menuGroupClass} ${isThisRoute ? activeClass : ''}`}
     >
      <FormattedMessage id={item.name} />
      <SubMenu
       id={idx}
       usingPath={usingPath}
       subMenu={item.subMenu}
      />
     </div>
    );
   });

   return tempList;
  }
 };

 getDefaultPathForNav = (usingPath) => {
  let defaultPath = null;
  const { userInfo } = this.props;

  const { adminRole, doctorRole, patientRole } = constVals.defaultKeys;
  const { userManagerRoute, doctorScheduleRoute, homeRoute } = routeSupplies.defaultRoutesForNav;
  const { system, doctor } = routeSupplies.paths;

  if ((usingPath === `${system}/` || usingPath === system) && userInfo.roleId === adminRole) {
   defaultPath = userManagerRoute;
  } else if (
   (usingPath === `${doctor}/` || usingPath === doctor) &&
   userInfo.roleId === doctorRole
  ) {
   defaultPath = doctorScheduleRoute;
  } else if (userInfo.roleId === patientRole) {
   defaultPath = homeRoute;
  }

  return defaultPath;
 };

 getActivePath = (subMenu, usingPath) => {
  const length = subMenu.length;
  for (let idx = 0; idx < length; idx++) {
   if (subMenu[idx].link === usingPath) {
    return true;
   }
  }
  return false;
 };

 render() {
  return <div className='menuGroup-content'>{this.renderMenuGroup()}</div>;
 }
}

const mapStateToProps = ({ appReducer, userReducer }) => ({
 userInfo: userReducer.userInfo,
});

const mapDispatchToProps = (dispatch) => ({});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(MenuGroup);
