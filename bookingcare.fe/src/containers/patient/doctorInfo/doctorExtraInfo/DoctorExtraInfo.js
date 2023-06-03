import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import * as combinedActions from '../../../../store/actions';
import * as constVals from '../../../../utilities/index';
import { FormattedMessage } from 'react-intl';
import Commons from '../../../../utilities/Commons';

class DoctorExtraInfo extends Component {
 state = {
  clinicAddress: '',
  clinicName: '',
  getPriceValue: '',
  seeMore: false,
 };

 componentDidMount = async () => {
  const { doctorId, getDoctorExtraInfoByIdForUiFn } = this.props;
  if (doctorId && typeof doctorId === constVals.typeKeyValue.numType) {
   const result = await getDoctorExtraInfoByIdForUiFn(doctorId);

   if (result.errCode === constVals.defaultValues.noErrors) {
    this.setState({ ...result.record });
   }
  }
 };

 renderPriceLangs = (getPriceValue) => {
  const { valueEN, valueVI } = getPriceValue;

  const price = Commons.formatCurrency(valueEN, valueVI, this.props.language);
  return price;
 };

 toggleSeeFn = () => {
  this.setState({
   seeMore: !this.state.seeMore,
  });
 };

 renderSeeMoreTable = () => {
  return (
   <div className='seeMore-table'>
    <div className='seeMore-table-up'>
     <div className='seeMore-table-title'>
      <span className='doctorExtraInfo-title'>
       <FormattedMessage id={constVals.doctorExtraInfoForUILangs.priceL} />
      </span>
      <span>{this.renderPriceLangs(this.state.getPriceValue)}</span>
     </div>
     <div className='seeMore-table-text'>
      Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD
     </div>
    </div>
    <div className='seeMore-table-down'>
     Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
    </div>
   </div>
  );
 };

 render() {
  const { clinicAddress, clinicName, getPriceValue, seeMore } = this.state;
  const { priceL, hideTableL, seeMoreL, addressL } = constVals.doctorExtraInfoForUILangs;

  return (
   <div className='doctorExtraInfo-content'>
    <div className='doctorExtraInfo-part doctorExtraInfo-up'>
     <span className='doctorExtraInfo-title'>
      <FormattedMessage id={addressL} />
     </span>
     <span className='up-address'>{clinicAddress && clinicAddress}</span>
     <span className='up-name'>{clinicName && clinicName}</span>
    </div>
    <div className='doctorExtraInfo-part doctorExtraInfo-down'>
     <span className='doctorExtraInfo-title'>
      <FormattedMessage id={priceL} />:{' '}
     </span>
     <span className='down-price'>
      {getPriceValue && this.renderPriceLangs(getPriceValue)}.
      <span
       className='down-seeMore'
       onClick={this.toggleSeeFn}
      >
       {seeMore ? <FormattedMessage id={hideTableL} /> : <FormattedMessage id={seeMoreL} />}
      </span>
     </span>
     {seeMore && this.renderSeeMoreTable()}
    </div>
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer }) => ({
 language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
 getDoctorExtraInfoByIdForUiFn: (id) => dispatch(combinedActions.getDoctorExtraInfoByIdForUiFn(id)),
 toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
