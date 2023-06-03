import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ClinicCarousel.scss';
import CarouselComp from '../carouses/CarouselComp';
import { FormattedMessage } from 'react-intl';
import * as constVals from '../../../../utilities';
import * as combinedActions from '../../../../store/actions';
import { paths } from '../../../../supplies/routeSupplies';

class ClinicCarousel extends Component {
 componentDidMount = async () => {
  const { allClinics, getAllClinicsFn } = this.props;
  if (!allClinics) await getAllClinicsFn();
 };

 renderToCarousel = (list) => {
  const { outstandingFacilityL } = constVals.clinicCarouselLangs;
  const title = <FormattedMessage id={outstandingFacilityL} />;

  return (
   <CarouselComp
    list={list ? list : []}
    title={title}
    path={paths.clinicDetail}
   />
  );
 };

 render() {
  const { allClinics } = this.props;
  return (
   <div className='clinicCarousel-content'>
    {allClinics && allClinics.length > 0 && this.renderToCarousel(allClinics)}
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer, adminReducer }) => ({
 language: appReducer.language,
 allClinics: adminReducer.allClinics,
});

const mapDispatchToProps = (dispatch) => ({
 getAllClinicsFn: () => dispatch(combinedActions.getAllClinicsFn()),
 toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ClinicCarousel);
