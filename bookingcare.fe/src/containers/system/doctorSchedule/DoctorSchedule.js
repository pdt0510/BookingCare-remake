import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as combinedActions from '../../../store/actions';
import './DoctorSchedule.scss';
import * as constVals from '../../../utilities';
import DoctorSelect from '../../../components/doctorSelect/DoctorSelect';
import DatePickerCustom from '../../../components/datePicker/DatePickerCustom';
import Commons from '../../../utilities/Commons';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {
 state = {
  isReset: false,
  selectStyle: {
   width: '100%',
   height: '38px',
  },
  selectedDoctorId: '',

  timemark1st: null,
  timemark2nd: null,
  startDate: new Date(),
 };

 componentDidMount = async () => {
  const { timemark1st, timemark2nd } = this.state;
  const { getScheduleRangeFn, timeMarkList } = this.props;
  if (!timeMarkList && !timemark1st && !timemark2nd) await getScheduleRangeFn();
  else if (timeMarkList && timeMarkList.length && !timemark1st && !timemark2nd) {
   this.renderTimemarks(timeMarkList);
  }
 };

 componentDidUpdate = (prevProps, prevState) => {
  const { timemark1st, timemark2nd } = this.state;
  const { timeMarkList } = this.props;

  if (timeMarkList && timeMarkList.length > 0 && !timemark1st && !timemark2nd) {
   this.renderTimemarks(timeMarkList);
  }
 };

 clearActivedTimemarks = () => {
  const { activeClass } = constVals.nameKeysValues;
  const activedBtns = document.querySelectorAll(`button.btn-timeMark.${activeClass}`);
  this.handleTimemark(null, activedBtns);
 };

 getActivedTimemarks = () => {
  const { activeClass } = constVals.nameKeysValues;
  const activedBtns = document.querySelectorAll(`button.btn-timeMark.${activeClass}`);

  if (activedBtns && activedBtns.length > 0) {
   let selectedMarktimes = [];

   for (let item of activedBtns) {
    const { name: timeType } = item;
    selectedMarktimes.push(timeType);
   }

   return selectedMarktimes;
  }
  return null;
 };

 handleTimemark = (event, activedTimemarks) => {
  const { activeClass } = constVals.nameKeysValues;

  if (event) {
   return event.target.classList.toggle(activeClass);
  } else if (activedTimemarks && activedTimemarks.length > 0) {
   for (let item of activedTimemarks) {
    item.classList.remove(activeClass);
   }
   return;
  }
 };

 renderTimemarks = (list) => {
  const timemark1st = [];
  const timemark2nd = [];
  const timeMarkcol = 4;

  const length = list && list.length;
  for (let idx = 0; idx < length; idx++) {
   let value = (
    <button
     key={idx}
     name={list[idx].keymap}
     className='BTN btn-timeMark'
     onClick={(eleEvent) => this.handleTimemark(eleEvent, null)}
    >
     {list[idx].valueEN}
    </button>
   );

   if (idx < timeMarkcol) {
    timemark1st.push(value);
   } else {
    timemark2nd.push(value);
   }
  }

  this.setState({
   timemark1st,
   timemark2nd,
  });
 };

 handleOnchange = async (event) => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
 };

 getDatePicker = (date) => {
  this.setState({
   startDate: date,
  });
 };

 clearForm = () => {
  if (window.confirm('Do you want to clear ?')) {
   this.resetForm();
  }
 };

 resetForm = () => {
  this.clearActivedTimemarks();
  this.setState({
   startDate: new Date(),
   selectedDoctorId: '',
  });
 };

 validationsSchedule = (stateObj) => {
  let isValid = true;
  for (let key in stateObj) {
   if (stateObj[key] === '' || stateObj[key] === null || stateObj[key] === undefined) {
    alert(`Incorrect: ${key}`);
    isValid = false;
    break;
   }
  }
  return isValid;
 };

 handleSchedule = () => {
  const { selectedDoctorId, startDate } = this.state;
  const activedMarktimes = this.getActivedTimemarks();
  let formattedDate = Commons.convertObjDateTo_DMYstr(startDate);
  formattedDate = Commons.convertDateToTimestamp(formattedDate);

  const dataForCheck = {
   timemarks: activedMarktimes,
   doctor: this.props.isAdmin ? selectedDoctorId : this.props.userInfo.id,
   date: formattedDate,
  };
  const isValid = this.validationsSchedule(dataForCheck);

  //fix doctorId
  if (isValid) {
   return dataForCheck.timemarks.map((timeType) => {
    const convertedToDb = {
     timeType,
     workdate: dataForCheck.date,
     doctorId: dataForCheck.doctor,
     maxNumber: process.env.REACT_APP_MAX_NUMBER_SCHEDULE,
    };
    return convertedToDb;
   });
  }

  return null;
 };

 submitSchedule = async () => {
  const schedulesArr = this.handleSchedule();

  if (schedulesArr && schedulesArr.length > 0) {
   const { createDoctorScheduleFn, toggleLoadingGif } = this.props;
   toggleLoadingGif();
   let result = await createDoctorScheduleFn(schedulesArr);

   if (result && result.errCode === constVals.defaultValues.noErrors) {
    this.resetForm();
   }

   Commons.onToastTimeoutTrigger({ toggleLoadingGif, result });
  }
 };

 render() {
  const { startDate, timemark1st, timemark2nd, selectedDoctorId, selectStyle, isReset } =
   this.state;
  const { doctorScheduleL, savebtnL, cancelBtnL } = constVals.doctorScheduleLangs;

  return (
   <div className='doctorSchedule-content container'>
    <div className='doctorSchedule-title'>
     <FormattedMessage id={doctorScheduleL} />
    </div>
    <div className='doctorSchedule-selectGroup'>
     {this.props.isAdmin && (
      <div className='col-6'>
       <DoctorSelect
        isReset={isReset}
        customStyle={selectStyle}
        selectedDoctorId={selectedDoctorId}
        handleOnchange={this.handleOnchange}
       />
      </div>
     )}
     <div className='col-6'>
      <DatePickerCustom
       minDate={true}
       startDate={startDate}
       getDatePicker={this.getDatePicker}
      />
     </div>
    </div>
    <div className='doctorSchedule-timeMarksGroup'>
     <div className='timeMark col-6'>{timemark1st && timemark1st.length > 0 && timemark1st}</div>
     <div className='timeMark col-6'>{timemark2nd && timemark2nd.length > 0 && timemark2nd}</div>
    </div>
    <div className='btnGroup col-12'>
     <span
      className='BTN BTN-danger'
      onClick={this.clearForm}
     >
      <FormattedMessage id={cancelBtnL} />
     </span>
     <span
      className='BTN BTN-primary'
      onClick={this.submitSchedule}
     >
      <FormattedMessage id={savebtnL} />
     </span>
    </div>
   </div>
  );
 }
}

const mapStateToProps = ({ adminReducer, userReducer }) => ({
 timeMarkList: adminReducer.timeMarkList,
 userInfo: userReducer.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
 createDoctorScheduleFn: (data) => dispatch(combinedActions.createDoctorScheduleFn(data)),
 getScheduleRangeFn: () => dispatch(combinedActions.getScheduleRangeFn()),
 toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
