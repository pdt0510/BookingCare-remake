import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SpecialityCarousel.scss';
import CarouselComp from '../carouses/CarouselComp';
import * as constVals from '../../../../utilities';
import { FormattedMessage } from 'react-intl';
import * as combinedActions from '../../../../store/actions';
import { paths } from '../../../../supplies/routeSupplies';

class SpecialityCarousel extends Component {
 componentDidMount = async () => {
  const { getAllSpecialitiesFn, allSpecialities } = this.props;
  if (!allSpecialities) {
   await getAllSpecialitiesFn();
  }
 };

 renderCarouselSpecialityList = (list) => {
  const { popularSpecialtiesL } = constVals.specialityCarouselLangs;
  const title = <FormattedMessage id={popularSpecialtiesL} />;

  return (
   <CarouselComp
    list={list ? list : []}
    title={title}
    path={paths.specialityDetail}
   />
  );
 };

 render() {
  const { allSpecialities } = this.props;
  return (
   <div className='SpecialityCarousel-content'>
    {allSpecialities &&
     allSpecialities.length > 0 &&
     this.renderCarouselSpecialityList(allSpecialities)}
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer, adminReducer }) => ({
 allSpecialities: adminReducer.allSpecialities,
 language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
 getAllSpecialitiesFn: () => dispatch(combinedActions.getAllSpecialitiesFn()),
 toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialityCarousel);
