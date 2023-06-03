import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './ClinicManager.scss';
import ImageFileComp from '../../../components/imgFileComp/ImageFileComp';
import Commons from '../../../utilities/Commons';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import SelectInputCustom from '../../../components/selectInputCustom/SelectInputCustom';
import * as constVals from '../../../utilities';
import { FormattedMessage } from 'react-intl';
import * as combinedActions from '../../../store/actions';

const mdParser = new MarkdownIt();
class ClinicManager extends Component {
 state = {
  imgFile: null,

  clinicId: constVals.defaultValues.noSelected,
  clinicList: [],
  initClinicList: [],

  clinicName: '',
  clinicAddress: '',

  htmlContent: '',
  textContent: '',
  toggleClear: false,

  idForUpdate: null,
  isUpdate: false,
 };

 componentDidMount = async () => {
  //trigger để ko phải build chức năng (getClinicListFn) tương tự trong didmount
  this.setState({});
 };

 componentDidUpdate = async (prevProps, prevState) => {
  const { getClinicListFn } = this.props;
  const { clinicList, clinicId } = this.state;

  if (clinicList && clinicList.length === 0 && clinicId === constVals.defaultValues.noSelected) {
   const result = await getClinicListFn();

   if (result.errCode === constVals.defaultValues.noErrors) {
    const clinicList = this.filterToSelectList(result.records);
    this.setState({ clinicList, initClinicList: result.records });
   }
  } else if (clinicList && clinicList.length > 0) {
   if (this.props.language !== prevProps.language) {
    const clinicList = this.filterToSelectList(this.state.initClinicList);
    this.setState({ clinicList });
   }
  }
 };

 filterToSelectList = (list) => {
  const clinicList = [];
  const length = list.length;
  const enLang = this.props.language === constVals.LANGUAGES.EN;

  for (let idx = 0; idx < length; idx++) {
   const { id, name } = list[idx];

   clinicList.push({
    keymap: id,
    value: enLang ? name.split('-')[1] : name.split('-')[0],
   });
  }

  return clinicList;
 };

 getImgFile = (imgFile) => {
  this.setState({ imgFile });
 };

 checkingEditValues = (objVals) => {
  let isValid = false;
  for (let key in objVals) {
   if (!objVals[key]) {
    if (key === 'id') {
     continue;
    } else {
     alert(`Missing param: ${key.toUpperCase()}`);
    }
    return isValid;
   }
  }
  return (isValid = true);
 };

 cancelFn = () => {
  const isDel = window.confirm(`you want to clear form ? - Data will be not lost`);

  if (isDel) {
   this.resetForm();
  }
 };

 resetForm = () => {
  this.setState({
   imgFile: null,

   clinicId: constVals.defaultValues.noSelected,
   clinicList: [],

   clinicName: '',
   clinicAddress: '',

   htmlContent: '',
   textContent: '',
   toggleClear: !this.state.toggleClear,

   isUpdate: false,
   idForUpdate: null,
  });
 };

 renderMdEditor = () => {
  return (
   <MdEditor
    value={this.state.textContent}
    renderHTML={(htmlStr) => mdParser.render(htmlStr)}
    onChange={this.editorOnchange}
   />
  );
 };

 editorOnchange = ({ html, text }) => {
  this.setState({
   htmlContent: html,
   textContent: text,
  });
 };

 renderInputFields = () => {
  const { clinicName, clinicAddress } = this.state;
  const { clinicNameN, clinicAddressN } = constVals.nameKeysValues;
  const { clinicNameL, clinicAddressL } = constVals.clinicManagerLangs;
  const clinicFields = [
   {
    name: clinicNameN,
    label: <FormattedMessage id={clinicNameL} />,
    selectedKey: clinicName,
    inputType: true,
   },
   {
    name: clinicAddressN,
    label: <FormattedMessage id={clinicAddressL} />,
    selectedKey: clinicAddress,
    inputType: true,
   },
  ];

  return clinicFields.map((props, idx) => {
   return (
    <SelectInputCustom
     key={idx}
     {...props}
     handleInput={this.handleInput}
    />
   );
  });
 };

 renderSelectField = () => {
  const { clinicList, clinicId } = this.state;
  const enLang = this.props.language === constVals.LANGUAGES.EN;

  const clinicSelectFields = [
   {
    name: constVals.nameKeysValues.clinicId,
    label: enLang ? 'Clinics' : 'Phòng khám',
    optionList: clinicList,
    selectedKey: clinicId,
    addingInitOpt: true,
   },
  ];

  return clinicSelectFields.map((props, idx) => {
   return (
    <SelectInputCustom
     key={idx}
     {...props}
     handleInput={this.handleInput}
    />
   );
  });
 };

 handleInput = async (event) => {
  const { name, value } = event.target;

  if (name === constVals.nameKeysValues.clinicId) {
   if (value !== constVals.defaultValues.noSelected) {
    const result = await this.props.getClinicByIdForSystemFn(value);
    const { id, address, textDesc, image, htmlDesc } = result.records;

    const dataForState = {
     clinicAddress: address,
     textContent: textDesc,
     htmlContent: htmlDesc,
     imgFile: Commons.convertBinaryToBase64(image.data),
     clinicName: result.records.name,
     idForUpdate: id,
    };

    this.setState({
     [name]: value,
     ...dataForState,
     isUpdate: true,
    });
   } else this.cancelFn();
  } else {
   this.setState({
    [name]: value,
   });
  }
 };

 cancel = () => {
  if (window.confirm(`Do you really want to reset ?`)) {
   this.resetForm();
  }
 };

 submitForm = async () => {
  const { imgFile, clinicName, clinicAddress, htmlContent, textContent } = this.state;

  const dataConvertedForCheck = {
   name: clinicName,
   address: clinicAddress,
   image: imgFile,
   content: htmlContent,
  };

  const isChecked = await Commons.checkFieldValidations(dataConvertedForCheck);

  if (isChecked) {
   const { toggleLoadingGif, createOrUpdateClinicFn } = this.props;
   const isStringImg = typeof imgFile === constVals.typeKeyValue.jsStringType;

   let dataConvertedForDb = {
    ...dataConvertedForCheck,
    image: isStringImg ? imgFile : await Commons.convertFileToBase64(imgFile),
    textDesc: textContent,
    htmlDesc: htmlContent,
    content: undefined,
   };

   if (this.state.isUpdate) {
    dataConvertedForDb = {
     ...dataConvertedForDb,
     id: this.state.idForUpdate,
    };
   }

   toggleLoadingGif();
   const result = await createOrUpdateClinicFn(dataConvertedForDb);
   if (result.errCode === constVals.defaultValues.noErrors) {
    this.resetForm();
   }

   Commons.onToastTimeoutTrigger({ toggleLoadingGif, result });
  }
 };

 render() {
  const { cancelBtnL, savebtnL, clinicManagerL } = constVals.clinicManagerLangs;
  const { jsStringType } = constVals.typeKeyValue;
  const { clinicList, imgFile, toggleClear } = this.state;

  return (
   <div className='clinicManager-content container'>
    <h3 className='clinicManager-title'>
     <FormattedMessage id={clinicManagerL} />
    </h3>
    <ImageFileComp
     IMGURL={typeof imgFile === jsStringType ? imgFile : null}
     toggleClear={toggleClear}
     getImgFile={this.getImgFile}
    />
    <div className='clinicManager-select'>
     {clinicList && clinicList.length > 0 && this.renderSelectField()}
    </div>
    <div className='clinicManager-input'>{this.renderInputFields()}</div>
    <div className='clinicManager-editor'>{this.renderMdEditor()}</div>
    <div className='doctorManager-btns'>
     <div
      className='BTN BTN-danger btn-cancel'
      onClick={this.cancelFn}
     >
      <FormattedMessage id={cancelBtnL} />
     </div>
     <div
      className='BTN BTN-default btn-save'
      onClick={this.submitForm}
     >
      <FormattedMessage id={savebtnL} />
     </div>
    </div>
   </div>
  );
 }
}
const mapStateToProps = ({ appReducer, adminReducer }) => ({
 language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
 getClinicByIdForSystemFn: (id) => dispatch(combinedActions.getClinicByIdForSystemFn(id)),
 getClinicListFn: () => dispatch(combinedActions.getClinicListFn()),
 createOrUpdateClinicFn: (newData) => dispatch(combinedActions.createOrUpdateClinicFn(newData)),
 toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ClinicManager);
