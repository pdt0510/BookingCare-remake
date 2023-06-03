import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import './CarouselComp.scss';
import { Link } from 'react-router-dom';
import { paths } from '../../../../supplies/routeSupplies';
import * as combinedActions from '../../../../store/actions';
import * as constVals from '../../../../utilities';

class CarouselComp extends Component {
 getPathName = (path) => {
  return path && path.split(':')[0];
 };

 renderItemList = (list) => {
  const pathName = this.getPathName(this.props.path);
  const enLang = this.props.language === constVals.LANGUAGES.EN;

  const tempList = list.map((item, idx) => {
   let name = null;
   if (paths.specialityDetail.includes(pathName) || paths.clinicDetail.includes(pathName)) {
    name = enLang ? item.name.split('-')[1] : item.name.split('-')[0];
   }

   let ele = (
    <Link
     key={idx}
     className='carousel-link'
     to={pathName + item.id}
    >
     <div
      className='imgBgr carousel-img'
      style={{ backgroundImage: `url(${item.img})` }}
     ></div>
     <div className='carousel-text'>{name ? name : item.name}</div>
    </Link>
   );
   return ele;
  });

  return tempList;
 };

 render() {
  const { list, title } = this.props;
  const settings = {
   infinite: false,
   speed: 500,
   slidesToShow: 4,
   slidesToScroll: 2,
   ...this.props.settings,
  };

  return (
   <div className='carousel-content'>
    <div className='section-content container'>
     <div className='section-title'>{title}</div>
     <Slider {...settings}>{this.renderItemList(list)}</Slider>
    </div>
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer }) => ({
 language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
 getAllDoctorsFn: () => dispatch(combinedActions.getAllDoctorsFn()),
 toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CarouselComp);
