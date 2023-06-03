import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorInfo.scss';
import HomeHeader from '../homePage/homeHeader/HomeHeader';
import DoctorIntro from './doctorIntro/DoctorIntro';
import DoctorMarkdown from './doctorMarkdown/DoctorMarkdown';
import * as combinedActions from '../../../store/actions';
import withRouterHOC from '../../../hoc/withRouterHOC';
import { compose } from 'redux';
import * as constVals from '../../../utilities/index';
import DoctorWorkdate from './doctorWorkdate/DoctorWorkdate';
import DoctorExtraInfo from './doctorExtraInfo/DoctorExtraInfo';

class DoctorInfo extends Component {
 state = {
  doctorId: null,
  doctorName: null,
 };

 componentDidMount = () => {
  const { router, DOCTORID } = this.props;
  let doctorId = null;

  if (DOCTORID) doctorId = DOCTORID;
  else doctorId = +router.params.id;
  if (doctorId && typeof doctorId === constVals.typeKeyValue.numType) {
   this.setState({ doctorId });
  }
 };

 renderForDoctorInFo = (doctorId) => {
  return (
   <div className='doctorInfo-content'>
    <HomeHeader />
    {doctorId && <DoctorIntro doctorId={doctorId} />}
    <div className='doctorInfo-detailes container'>
     <div className='doctorInfo-left'>{doctorId && <DoctorWorkdate doctorId={doctorId} />}</div>
     <div className='doctorInfo-right'>{doctorId && <DoctorExtraInfo doctorId={doctorId} />}</div>
    </div>
    {doctorId && <DoctorMarkdown doctorId={doctorId} />}
   </div>
  );
 };

 renderForSpeciality = (doctorId) => {
  return (
   <div className='doctorInfo-content'>
    {doctorId && (
     <DoctorIntro
      doctorId={doctorId}
      navFromSpeciality={true}
     />
    )}
    <div className='doctorInfo-detailes'>
     <div className='doctorInfo-left'>{doctorId && <DoctorWorkdate doctorId={doctorId} />}</div>
     <div className='doctorInfo-right'>{doctorId && <DoctorExtraInfo doctorId={doctorId} />}</div>
    </div>
   </div>
  );
 };

 render() {
  const { doctorId } = this.state;
  const { DOCTORID } = this.props;

  return (
   <>
    {DOCTORID && doctorId && this.renderForSpeciality(doctorId)}
    {!DOCTORID && doctorId && this.renderForDoctorInFo(doctorId)}
   </>
  );
 }
}

const mapStateToProps = ({ userReducer, appReducer }) => {
 return {
  language: appReducer.language,
  isLoggedIn: userReducer.isLoggedIn,
 };
};

const mapDispatchToProps = (dispatch) => ({});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(DoctorInfo);
