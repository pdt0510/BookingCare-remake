import React, { Component } from 'react';
import './DoctorSelect.scss';
import * as constVals from '../../utilities/index';
import { connect } from 'react-redux';
import * as combinedActions from '../../store/actions';
import Commons from '../../utilities/Commons';
import { apiStates } from '../../supplies/apiSupplies';
import { FormattedMessage } from 'react-intl';

class DoctorSelect extends Component {
 state = {
  doctorList: [],
  ascending: true,
 };

 componentDidMount = async () => {
  const { doctorList } = this.state;
  if (doctorList && !doctorList.length) {
   let result = await this.props.getAllDoctorsFn();

   if (!result) {
    result = { ...apiStates.serverError };
    Commons.onToastTimeoutTrigger({ result });
   }
  }
 };

 componentDidUpdate = (prevProps, prevState) => {
  const { doctorList, ascending } = this.state;
  const { allDoctors, language } = this.props;

  if (!doctorList.length && allDoctors) {
   this.postAllToState();
  } else if (doctorList.length) {
   if (language !== prevProps.language || ascending !== prevState.ascending) {
    this.postAllToState();
   }
  }
 };

 postAllToState = async () => {
  let tempList = this.sortListByName(this.props.allDoctors);
  tempList = this.convertToDoctorList(tempList);

  this.setState({
   doctorList: tempList,
  });
 };

 sortListByName = (list) => {
  const listCloned = [...list];
  const { ascending } = this.state;

  return listCloned.sort((a, b) => {
   const nameA = a.firstname.toLowerCase();
   const nameB = b.firstname.toLowerCase();
   const result = nameB.sortByName(nameA);

   if (result) {
    return ascending ? -1 : 1;
   }
   if (!result) {
    return ascending ? 1 : -1;
   }

   return 0;
  });
 };

 convertToDoctorList = (list) => {
  const { doctorList } = this.state;

  let tempList = [...list];
  let convertImg = doctorList && doctorList.length === 0 ? true : false;

  tempList = tempList.map((item, idx) => {
   const fullName = Commons.handleFullname(item.firstname, item.lastname, this.props.language);
   let imgConvertedToBase64 = convertImg ? Commons.convertBinaryToBase64(item.avatar) : null;

   return {
    id: item.id,
    name: fullName,
    avatar: convertImg ? imgConvertedToBase64 : doctorList[idx].avatar,
   };
  });

  return tempList;
 };

 renderSelect = (list) => {
  const { customStyle, selectedDoctorId } = this.props;

  return (
   <select
    style={customStyle && { ...customStyle }}
    value={selectedDoctorId}
    name={constVals.nameKeysValues.selectedDoctorId}
    className='select-input-custom'
    onChange={this.selectOnchange}
   >
    {list && list.length > 0 && this.renderSelectOpts(list)}
   </select>
  );
 };

 renderSelectOpts = (list) => {
  const firstOpt = (
   <option
    key={0}
    value={''}
   >
    - <FormattedMessage id={constVals.doctorManagerLangs.selectTextL} /> -
   </option>
  );

  const optList = list.map((item, idx) => {
   return (
    <option
     key={idx + 1}
     value={item.id}
    >
     {item.name}
    </option>
   );
  });

  optList.unshift(firstOpt);
  return optList;
 };

 selectOnchange = async (event) => {
  await this.props.handleOnchange(event);
 };

 switchSortingName = () => {
  this.setState({
   ascending: !this.state.ascending,
  });
 };

 renderIconSort = () => {
  return this.state.ascending ? (
   <i className='fas fa-arrow-up' />
  ) : (
   <i className='fas fa-arrow-down' />
  );
 };

 render() {
  const { doctorList } = this.state;
  const { allDoctors } = this.props;

  return (
   <div className='doctorSelect-content'>
    {doctorList && doctorList.length > 0 && this.renderSelect(doctorList)}
    <span
     className='select-sort-icon'
     onClick={this.switchSortingName}
    >
     {allDoctors && allDoctors.length && this.renderIconSort()}
    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSelect);
