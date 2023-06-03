import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorCarousel.scss';
import CarouselComp from '../carouses/CarouselComp';
import { FormattedMessage } from 'react-intl';
import * as combinedActions from '../../../../store/actions';
import * as constVals from '../../../../utilities';
import Commons from '../../../../utilities/Commons';
import { apiStates } from '../../../../supplies/apiSupplies';
import { paths } from '../../../../supplies/routeSupplies';

class DoctorCarousel extends Component {
 state = {
  list: [],
 };

 componentDidMount = async () => {
  const { list } = this.state;

  if (list && !list.length) {
   let result = await this.props.getAllDoctorsFn();

   if (!result) {
    result = { ...apiStates.serverError };
    Commons.onToastTimeoutTrigger({ result });
   }
  }
 };

 componentDidUpdate = (prevProps, prevState) => {
  const { list } = this.state;
  const { allDoctors, language } = this.props;

  if (list && !list.length && allDoctors) {
   const list = this.convertToCarouselList(allDoctors);
   this.setState({ list });
  } else if (list && list.length) {
   if (language !== prevProps.language) {
    const list = this.convertToCarouselList(allDoctors);
    this.setState({ list });
   }
  }
 };

 convertToCarouselList = (listArr) => {
  const { list } = this.state;
  const { doctorL } = constVals.doctorCarouselLangs;

  let tempList = [...listArr];
  let convertImg = list && list.length === 0 ? true : false;

  tempList = tempList.map((item, idx) => {
   const fullName = Commons.handleFullname(item.firstname, item.lastname, this.props.language);
   let imgConvertedToBase64 = convertImg ? Commons.convertBinaryToBase64(item.avatar) : null;

   return {
    id: item.id,
    img: convertImg ? imgConvertedToBase64 : list[idx].img,
    name: (
     <>
      <FormattedMessage id={doctorL} /> {''}
      {fullName}
     </>
    ),
   };
  });

  return tempList;
 };

 render() {
  const { outstandingDoctorL, doctorL } = constVals.doctorCarouselLangs;
  const title = <FormattedMessage id={outstandingDoctorL} />;
  const list2 = [
   {
    id: 61,
    img: require('../../../../assets/images/doctors/083702tien-si-do-phuong-vinh.jpg'),
    name: (
     <>
      <FormattedMessage id={doctorL} /> {''}
      Đỗ Phương Vinh
     </>
    ),
   },
   {
    img: require('../../../../assets/images/doctors/084302-pgs-nguyen-trong-hung.jpg'),
    name: (
     <>
      <FormattedMessage id={doctorL} /> {''}
      Nguyễn Trọng Hưng{' '}
     </>
    ),
   },
   {
    img: require('../../../../assets/images/doctors/090559-pgs-nguyen-thi-hoai-an.jpg'),
    name: (
     <>
      <FormattedMessage id={doctorL} /> {''}
      Nguyễn Thị Hòai An
     </>
    ),
   },
   {
    img: require('../../../../assets/images/doctors/104940-bs-vi.jpg'),
    name: (
     <>
      <FormattedMessage id={doctorL} /> {''}
      Tường Vi
     </>
    ),
   },
   {
    img: require('../../../../assets/images/doctors/105401-bsckii-tran-minh-khuyen.jpg'),
    name: 'Trần Minh Khuyên',
   },
   {
    img: require('../../../../assets/images/doctors/114430-bshung.jpg'),
    name: 'Lê Minh Hưng',
   },
   {
    img: require('../../../../assets/images/doctors/142251-165836-1-bs-tuyet-xuong.jpg'),
    name: 'Lý Tuyết Xương',
   },
   {
    img: require('../../../../assets/images/doctors/142313-bs-tran-huu-binh.jpg'),
    name: 'Trần Hưu Bình',
   },
   {
    img: require('../../../../assets/images/doctors/154738-bs-nguyen-thi-thanh-binh-e.jpg'),
    name: 'Nguyễn Thị Thanh Bình',
   },
   {
    img: require('../../../../assets/images/doctors/160049-bs-hoai-huong.jpg'),
    name: 'Nguyễn Hoài Hương',
   },
  ];
  const { list } = this.state;

  return (
   <div className='DoctorCarousel-content'>
    <CarouselComp
     list={list && list.length > 0 ? list : []}
     title={title}
     path={paths.doctorInfo}
    />
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer, adminReducer }) => ({
 language: appReducer.language,
 allDoctors: adminReducer.allDoctors,
});

const mapDispatchToProps = (dispatch) => ({
 getAllDoctorsFn: () => dispatch(combinedActions.getAllDoctorsFn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCarousel);
