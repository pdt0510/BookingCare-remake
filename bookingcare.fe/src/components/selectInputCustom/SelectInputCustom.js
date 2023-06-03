import React, { Component } from 'react';
import './SelectInputCustom.scss';
import { connect } from 'react-redux';
import * as combinedActions from '../../store/actions';
import * as constVals from '../../utilities/index';

class SelectInputCustom extends Component {
 renderSelect = (list) => {
  const { selectedKey, name, label, disabled } = this.props;
  return (
   <>
    <label className='selectInputCustom-label'>{label}</label>
    <select
     name={name}
     disabled={disabled}
     value={selectedKey}
     className='select-input-custom forSelect'
     onChange={this.handleOnchange}
    >
     {list && list.length > 0 && this.renderSelectOpts(list, label)}
    </select>
   </>
  );
 };

 renderInput = () => {
  const { selectedKey, name, label } = this.props;
  return (
   <>
    <label
     className='selectInputCustom-label'
     htmlFor={`${name}For`}
    >
     {label}
    </label>
    <input
     id={`${name}For`}
     type='text'
     name={name}
     value={selectedKey}
     className='select-input-custom'
     onChange={this.handleOnchange}
    />
   </>
  );
 };

 renderSelectOpts = (list, label) => {
  const optList = list.map((item, idx) => {
   const { keymap, value } = item;
   return (
    <option
     key={idx}
     value={keymap}
    >
     {value}
    </option>
   );
  });

  if (this.props.addingInitOpt) {
   const enLang = this.props.language === constVals.LANGUAGES.EN;
   const selectLang = enLang ? `Select` : 'Chọn';

   const firstOpt = (
    <option
     key='idx'
     value={constVals.defaultValues.noSelected}
    >
     {`- ${selectLang} ${label.toLowerCase()} -`}
    </option>
   );
   optList.unshift(firstOpt);
  }

  return optList;
 };

 handleOnchange = (event) => {
  this.props.handleInput(event);
 };

 render() {
  const { optionList, inputType } = this.props;
  return (
   <div className='selectInputCustom-content'>
    {!inputType && optionList && optionList.length > 0 && this.renderSelect(optionList)}
    {inputType && this.renderInput()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectInputCustom);
