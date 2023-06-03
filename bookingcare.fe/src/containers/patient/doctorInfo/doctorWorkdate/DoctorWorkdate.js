import React, { Component } from 'react';
import './DoctorWorkdate.scss';
import * as constVals from '../../../../utilities/index';
import { connect } from 'react-redux';
import * as combinedActions from '../../../../store/actions';
import Commons from '../../../../utilities/Commons';
import { apiStates } from '../../../../supplies/apiSupplies';
import { FormattedMessage } from 'react-intl';
import BookingModal from '../bookingModal/BookingModal';

class DoctorWorkdate extends Component {
 state = {
  uniqueDayList: [],
  uiDateList: [],
  timeMarks: [],
  selectedDate: '',
  toggleModal: false,
  bookingInfo: null,
  doctorWorkdate: [],
 };

 componentDidMount = async () => {
  const { uniqueDayList, doctorWorkdate } = this.state;
  const { getDoctorWorkdateByIdFn, doctorId } = this.props;

  if (uniqueDayList && !uniqueDayList.length && doctorWorkdate.length === 0) {
   let result = await getDoctorWorkdateByIdFn(doctorId);
   if (result.errCode === constVals.defaultValues.noErrors) {
    this.postAllToState(result.records);
   } else if (!result) {
    result = { ...apiStates.serverError };
    Commons.onToastTimeoutTrigger({ result });
   }
  }
 };

 componentDidUpdate = (prevProps, prevState) => {
  const { uniqueDayList, doctorWorkdate } = this.state;
  const { language } = this.props;

  if (!uniqueDayList.length && doctorWorkdate.length > 0) {
   this.postAllToState(doctorWorkdate);
  } else if (uniqueDayList.length > 0) {
   if (language !== prevProps.language) {
    const uiDateList = this.getUiDateListFn(uniqueDayList);
    this.setState({ uiDateList });
   }
  }
 };

 postAllToState = (doctorWorkdate) => {
  const { selectedDate } = this.state;
  const uniqueDayList = this.getUniqueDays(doctorWorkdate);
  const uiDateList = this.getUiDateListFn(uniqueDayList);
  const newSelectedDate = selectedDate ? selectedDate : uniqueDayList[0];
  const timeMarks = this.getTimetypeFn(newSelectedDate, doctorWorkdate);

  this.setState({
   uniqueDayList,
   uiDateList,
   timeMarks,
   selectedDate: newSelectedDate,
   doctorWorkdate,
  });
 };

 getUniqueDays = (list) => {
  const uniqueDayList = [];

  list.map((item) => {
   if (!uniqueDayList.includes(item.workdate)) {
    uniqueDayList.push(item.workdate);
   }
   return null;
  });

  return uniqueDayList.sort();
 };

 getUiDateListFn = (list) => {
  Commons.switchLangLocally(this.props.language);
  return list.map((workdate) => {
   return {
    workdate,
    dateUi: Commons.convertTimestampTo_dDMstr(workdate),
   };
  });
 };

 renderSelect = (list) => {
  return (
   <select
    value={this.state.selectedDate}
    name={constVals.nameKeysValues.selectedDate}
    className='select-input-custom'
    onChange={this.handleOnchange}
   >
    {list && list.length > 0 && this.renderSelectOpts(list)}
   </select>
  );
 };

 renderSelectOpts = (list) => {
  const tempOpts = [];
  const { today, todayVi } = constVals.nameKeysValues;
  const currentDate = Commons.getTimestampCurrentDate();
  const enLang = this.props.language === constVals.LANGUAGES.EN;

  const length = list.length;
  for (let idx = 0; idx < length; idx++) {
   const { workdate, dateUi } = list[idx];
   if (currentDate > workdate) continue;

   let todayUi = null;
   if (currentDate === workdate) {
    todayUi = `${enLang ? today : todayVi}, ${dateUi.split(',')[1]}`;
   }
   tempOpts.push(
    <option
     key={idx}
     value={workdate}
    >
     {todayUi ? todayUi : dateUi}
    </option>,
   );
  }

  return tempOpts;
 };

 handleOnchange = (event) => {
  const { name, value } = event.target;
  const timeMarks = this.getTimetypeFn(+value, this.state.doctorWorkdate);

  this.setState({
   [name]: value,
   timeMarks,
  });
 };

 configTimeValsFn = () => {
  let timeTypeVals = {};
  let startTime = 7;
  const keyLength = 8;
  const timebreak = 12;

  for (let key = 1; key <= keyLength; key++) {
   if (key + startTime === timebreak) startTime++;
   timeTypeVals[`T${key}`] = key + startTime;
  }

  return timeTypeVals;
 };

 checkFulltimeWorkdate = (day, currentDate, currentHour, timeTypeList) => {
  if (day === currentDate) {
   const fullTime = 'T8';
   if (currentHour > timeTypeList[fullTime]) return true;
  }
  return false;
 };

 getTimetypeFn = (dateVal, doctorWorkdate) => {
  const currentDate = Commons.getTimestampCurrentDate();

  const timeTypeList = this.configTimeValsFn();
  const currentHour = new Date().getHours();

  const isFulltime = this.checkFulltimeWorkdate(dateVal, currentDate, currentHour, timeTypeList);
  if (isFulltime) return [];

  const templist = [];
  const length = doctorWorkdate.length;
  for (let idx = 0; idx < length; idx++) {
   let ele = null;
   let hiddenTime = false;
   const { timeType, doctorWorkdateData } = doctorWorkdate[idx];
   const { valueEN } = doctorWorkdateData;

   if (dateVal === doctorWorkdate[idx].workdate) {
    if (currentDate === doctorWorkdate[idx].workdate) {
     hiddenTime = currentHour > timeTypeList[timeType];
    }

    ele = (
     <button
      key={idx}
      name={timeType}
      value={valueEN}
      hidden={hiddenTime}
      className='BTN btn-timeMark'
      onClick={this.bookingADateFn}
     >
      {valueEN}
     </button>
    );
    templist.push(ele);
   }
  }

  return templist;
 };

 bookingADateFn = (event) => {
  const { name, value } = event.target;
  const { selectedDate } = this.state;

  const bookingInfo = {
   time: value,
   timeType: name,
   dateBooked: selectedDate,
   dateBookedStr: Commons.convertTimestampTo_dDMYstr(selectedDate),
  };

  this.setState({
   toggleModal: !this.state.toggleModal,
   bookingInfo,
  });
 };

 renderTimemarks = (timeMarks) => {
  const { scheduleL, chooseBookingL } = constVals.doctorWorkdateLangs;

  return (
   <>
    <div className='timemark-text'>
     <FormattedMessage id={scheduleL} />
    </div>
    {timeMarks && timeMarks.length > 0 && timeMarks}
    <div className='timemark-text'>
     <FormattedMessage id={chooseBookingL} />
    </div>
   </>
  );
 };

 renderBookingModal = (doctorId) => {
  const { bookingInfo, toggleModal } = this.state;
  return (
   <div className='booking-modal'>
    <BookingModal
     doctorId={doctorId}
     toggleModal={toggleModal}
     bookingInfo={bookingInfo}
    />
   </div>
  );
 };

 render() {
  const { uiDateList, timeMarks } = this.state;
  return (
   <>
    <div className='doctorWorkdate-content'>
     {uiDateList && uiDateList.length > 0 && this.renderSelect(uiDateList)}
     <div className='doctorWorkdate-timemark'>
      {timeMarks && timeMarks.length > 0 ? this.renderTimemarks(timeMarks) : 'No schedule'}
     </div>
     {timeMarks &&
      timeMarks.length > 0 &&
      this.props.doctorId &&
      this.renderBookingModal(this.props.doctorId)}
    </div>
   </>
  );
 }
}

const mapStateToProps = ({ appReducer, adminReducer }) => ({
 language: appReducer.language,
 doctorWorkdateRedux: adminReducer.doctorWorkdate,
});

const mapDispatchToProps = (dispatch) => ({
 getDoctorWorkdateByIdFn: (id) => dispatch(combinedActions.getDoctorWorkdateByIdFn(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorWorkdate);
