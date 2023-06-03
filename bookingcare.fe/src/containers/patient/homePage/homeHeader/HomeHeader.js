import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import Languages from '../../../../components/languagesComp/Languages';
import * as constVals from '../../../../utilities';
import { FormattedMessage } from 'react-intl';
import { paths } from '../../../../supplies/routeSupplies';
import { compose } from 'redux';
import withRouterHOC from '../../../../hoc/withRouterHOC';

class HomeHeader extends Component {
 renderHeaderMid = () => {
  const {
   specialityL,
   findTheDoctorBySpecialtyL,
   healthFacilitiesL,
   chooseHospitalClinicL,
   doctorL,
   chooseDoctorL,
   examinationPackageL,
   generalHealthCheckL,
  } = constVals.homeHeaderLangs;

  const homeHeaderMid = [
   {
    title: <FormattedMessage id={specialityL} />,
    info: <FormattedMessage id={findTheDoctorBySpecialtyL} />,
   },
   {
    title: <FormattedMessage id={healthFacilitiesL} />,
    info: <FormattedMessage id={chooseHospitalClinicL} />,
   },
   {
    title: <FormattedMessage id={doctorL} />,
    info: <FormattedMessage id={chooseDoctorL} />,
   },
   {
    title: <FormattedMessage id={examinationPackageL} />,
    info: <FormattedMessage id={generalHealthCheckL} />,
   },
  ];

  const tempList = homeHeaderMid.map((item, idx) => {
   return (
    <ul
     className='homeHeader-mid-block'
     key={idx}
    >
     <li className='homeHeader-mid-title'>{item.title}</li>
     <li className='homeHeader-mid-info'>{item.info}</li>
    </ul>
   );
  });

  return tempList;
 };

 navToHomepage = () => {
  const { navigate } = this.props.router;
  navigate(paths.main);
 };

 render() {
  return (
   <div className='posLayer homeHeader-content'>
    <div className='homeHeader-container container'>
     <div className='homeHeader-left'>
      <div className='homeHeader-icon'>
       <i className='fas fa-bars'></i>
      </div>
      <div
       className='imgBgr homeHeader-img'
       onClick={this.navToHomepage}
      ></div>
     </div>
     <div className='homeHeader-mid'>{this.renderHeaderMid()}</div>
     <div className='homeHeader-right'>
      <Languages />
     </div>
    </div>
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer }) => ({
 language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(HomeHeader);
