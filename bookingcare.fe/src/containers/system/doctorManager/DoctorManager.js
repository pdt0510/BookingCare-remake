import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorManager.scss';
import * as combinedActions from '../../../store/actions';
import * as constVals from '../../../utilities';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';
import DoctorSelect from '../../../components/doctorSelect/DoctorSelect';
import DoctorExtra from '../../../components/doctorExtra/DoctorExtra';
import Commons from '../../../utilities/Commons';
import { apiStates } from '../../../supplies/apiSupplies';

const mdParser = new MarkdownIt();
class DoctorManager extends Component {
	state = {
		form: {
			htmlContent: '',
			textContent: '',
			description: '',
		},
		selectedDoctorId: constVals.defaultValues.noSelected,

		extra: {
			priceId: constVals.defaultKeys.priceId,
			paymentId: constVals.defaultKeys.paymentId,
			provinceId: constVals.defaultKeys.provinceId,
			specialityId: constVals.defaultKeys.specialityId,
			clinicName: '',
			clinicAddress: '',
			note: '',
		},
		priceList: [],
		paymentList: [],
		provinceList: [],
		specialityList: [],
	};

	componentDidMount = async () => {
		const { getAllcodesExtraFn, allcodesExtra, getAllSpecialitiesFn, allSpecialitiesForSystem } =
			this.props;

		if (!allcodesExtra || !allSpecialitiesForSystem) {
			await getAllcodesExtraFn();
			await getAllSpecialitiesFn();
		} else if (allcodesExtra.length > 0 && allSpecialitiesForSystem.length > 0) {
			const allcodeObj = this.filterAllcodesExtra(allcodesExtra);
			const specialityList = this.filterAllSpecialitiesForSystem(allSpecialitiesForSystem);
			this.setState({ ...allcodeObj, specialityList });
		}
	};

	componentDidUpdate = (prevProps) => {
		const { priceList, paymentList, provinceList } = this.state;
		const { allcodesExtra, language, allSpecialitiesForSystem } = this.props;

		if (!priceList.length && allcodesExtra && allSpecialitiesForSystem) {
			const allcodeObj = this.filterAllcodesExtra(allcodesExtra);
			const specialityList = this.filterAllSpecialitiesForSystem(allSpecialitiesForSystem);
			this.setState({ ...allcodeObj, specialityList });
		} else if (priceList.length > 0 && paymentList.length > 0 && provinceList.length > 0) {
			if (language !== prevProps.language) {
				const allcodeObj = this.filterAllcodesExtra(allcodesExtra);
				const specialityList = this.filterAllSpecialitiesForSystem(allSpecialitiesForSystem);
				this.setState({ ...allcodeObj, specialityList });
			}
		}
	};

	filterAllcodesExtra = (list) => {
		const { language } = this.props;
		const { priceType, paymentType, provinceType } = constVals.typeKeyValue;
		const enLang = language === constVals.LANGUAGES.EN;

		const priceList = [];
		const paymentList = [];
		const provinceList = [];

		list.map((item) => {
			const { type, keymap, valueEN, valueVI } = item;
			const ele = {
				keymap,
				value: enLang ? valueEN : valueVI,
			};

			if (type === priceType) {
				const eleFormatted = {
					...ele,
					value: Commons.formatCurrency(valueEN, valueVI, language),
				};

				priceList.push(eleFormatted);
			} else if (type === paymentType) {
				paymentList.push(ele);
			} else if (type === provinceType) {
				provinceList.push(ele);
			}
			return null;
		});

		return {
			priceList,
			paymentList,
			provinceList,
		};
	};

	filterAllSpecialitiesForSystem = (list) => {
		const specialityList = [];
		const enLang = this.props.language === constVals.LANGUAGES.EN;

		const length = list.length;
		for (let idx = 0; idx < length; idx++) {
			const { name, id } = list[idx];
			specialityList.push({
				keymap: id,
				value: enLang ? name.split('-')[1] : name.split('-')[0],
			});
		}

		return specialityList;
	};

	handleOnchange = async (event) => {
		const { name, value } = event.target;

		const {
			description,
			selectedDoctorId,
			priceId,
			paymentId,
			provinceId,
			clinicNameN,
			clinicAddressN,
			noteN,
			specialityId,
		} = constVals.nameKeysValues;

		if (name === description) {
			this.setState({
				form: {
					...this.state.form,
					[name]: value,
				},
			});
		} else if (name === selectedDoctorId) {
			const doctorMarkdown = await this.getDoctorMarkdownById(value);
			const doctorExtraInfo = await this.getDoctorExtraInfoById(value);

			this.setState({
				selectedDoctorId: value,
				form: { ...doctorMarkdown },
				extra: { ...doctorExtraInfo },
			});
		} else if (
			name === priceId ||
			name === paymentId ||
			name === provinceId ||
			name === clinicNameN ||
			name === clinicAddressN ||
			name === noteN ||
			name === specialityId
		) {
			this.setState({
				extra: { ...this.state.extra, [name]: value },
			});
		}
	};

	getDoctorMarkdownById = async (id) => {
		let markdownInfo = null;
		const { noSelected, noErrors, defaultMarkdown } = constVals.defaultValues;

		if (id !== noSelected) {
			const result = await this.props.getDoctorContentByIdFn(id);
			if (result && result.errCode === noErrors) markdownInfo = result.record;
		}

		return markdownInfo ? markdownInfo : defaultMarkdown;
	};

	getDoctorExtraInfoById = async (id) => {
		let extraInfo = null;
		const { noSelected, noErrors, defaultExtra } = constVals.defaultValues;

		if (id !== noSelected) {
			const result = await this.props.getDoctorExtraInfoByIdFn(id);
			if (result && result.errCode === noErrors) extraInfo = result.record;
		}

		return extraInfo ? extraInfo : defaultExtra;
	};

	renderDesc = () => {
		const customStyle = {
			border: '1px solid #e0e0e0',
			maxHeight: '100px',
			minHeight: '65px',
			height: '65px',
		};

		return (
			<>
				<label
					htmlFor='descFor'
					className='doctorManager-label'
				>
					<FormattedMessage id={constVals.doctorManagerLangs.descL} />
				</label>
				<textarea
					id='descFor'
					name='description'
					rows='4'
					style={{ ...customStyle }}
					value={this.state.form.description}
					onChange={this.handleOnchange}
				></textarea>
			</>
		);
	};

	handleEditor = ({ html, text }) => {
		this.setState({
			form: {
				...this.state.form,
				htmlContent: html,
				textContent: text,
			},
		});
	};

	renderMdEditor = () => {
		return (
			<MdEditor
				value={this.state.form.textContent}
				renderHTML={(htmlStr) => mdParser.render(htmlStr)}
				onChange={this.handleEditor}
			/>
		);
	};

	resetState = () => {
		this.setState({
			selectedDoctorId: constVals.defaultValues.noSelected,
			form: {
				description: '',
				htmlContent: '',
				textContent: '',
			},

			extra: {
				priceId: this.state.priceList[0].keymap,
				paymentId: this.state.paymentList[0].keymap,
				provinceId: this.state.provinceList[0].keymap,
				specialityId: this.state.specialityList[0].keymap,
				clinicName: '',
				clinicAddress: '',
				note: '',
			},
		});
	};

	handleCancel = () => {
		if (window.confirm('Do you want to clear the form ?')) {
			this.resetState();
		}
	};

	checkFieldValidations = (valObject, isUpdate = false) => {
		let isValid = true;

		for (const key in valObject) {
			if (valObject[key] === null || valObject[key] === undefined || valObject[key] === '') {
				isValid = false;
			}

			if (isValid === false) {
				alert(`Your "${key}" is incorrect`);
				break;
			}
		}
		return isValid;
	};

	handleSubmit = async () => {
		const dataConvertedForCheck = {
			doctorId: this.state.selectedDoctorId,
			...this.state.form,
			...this.state.extra,
		};
		const isValid = this.checkFieldValidations(dataConvertedForCheck);

		if (isValid) {
			const { createDoctorMarkdownFn, toggleLoadingGif } = this.props;
			const dataForMarkdown = {
				doctorId: this.state.selectedDoctorId,
				...this.state.form,
			};

			toggleLoadingGif();
			let result = await createDoctorMarkdownFn(dataForMarkdown);

			if (result && result.errCode === constVals.defaultValues.noErrors) {
				const dataForExtra = {
					doctorId: this.state.selectedDoctorId,
					...this.state.extra,
				};
				result = await this.props.createDoctorExtraInfoByIdFn(dataForExtra);

				if (result && result.errCode === constVals.defaultValues.noErrors) {
					this.resetState();
				}
			}

			if (result && result.errCode !== constVals.defaultValues.noErrors) {
				result = { ...apiStates.serverError };
			}
			Commons.onToastTimeoutTrigger({ toggleLoadingGif, result });
		}
	};

	renderDoctorExtraSelect = () => {
		const { priceList, provinceList, paymentList, extra } = this.state;
		const { priceId, paymentId, provinceId } = extra;
		const { choosePriceL, chooseMethodL, chooseProvinceL } = constVals.doctorExtraInfoLangs;

		const extraSelectFields = [
			{
				name: constVals.nameKeysValues.priceId,
				label: <FormattedMessage id={choosePriceL} />,
				optionList: priceList,
				selectedKey: priceId,
			},
			{
				name: constVals.nameKeysValues.paymentId,
				label: <FormattedMessage id={chooseMethodL} />,
				optionList: paymentList,
				selectedKey: paymentId,
			},
			{
				name: constVals.nameKeysValues.provinceId,
				label: <FormattedMessage id={chooseProvinceL} />,
				optionList: provinceList,
				selectedKey: provinceId,
			},
		];

		return extraSelectFields.map((props, idx) => {
			return (
				<DoctorExtra
					key={idx}
					{...props}
					handleOnchange={this.handleOnchange}
				/>
			);
		});
	};

	renderDoctorExtraSelect2 = () => {
		const { specialityList, extra } = this.state;
		const { specialityId } = extra;

		const otherFields = [
			{
				name: constVals.nameKeysValues.specialityId,
				label: <FormattedMessage id={constVals.doctorManagerLangs.chooseSpecialityL} />,
				optionList: specialityList,
				selectedKey: specialityId,
			},
		];

		return otherFields.map((props, idx) => {
			return (
				<DoctorExtra
					key={idx}
					{...props}
					handleOnchange={this.handleOnchange}
				/>
			);
		});
	};

	renderDoctorExtraInput = () => {
		const { clinicName, clinicAddress, note } = this.state.extra;
		const { clinicNameN, clinicAddressN, noteN } = constVals.nameKeysValues;
		const { clinicNameL, clinicAddressL, noteL } = constVals.doctorExtraInfoLangs;

		const extraInputFields = [
			{
				name: clinicNameN,
				label: <FormattedMessage id={clinicNameL} />,
				selectedKey: clinicName,
			},
			{
				name: clinicAddressN,
				label: <FormattedMessage id={clinicAddressL} />,
				selectedKey: clinicAddress,
			},
			{
				name: noteN,
				label: <FormattedMessage id={noteL} />,
				selectedKey: note,
			},
		];

		return extraInputFields.map((props, idx) => {
			return (
				<DoctorExtra
					key={idx}
					{...props}
					inputType={true}
					handleOnchange={this.handleOnchange}
				/>
			);
		});
	};

	render() {
		const { doctorContentL, cancelBtnL, savebtnL } = constVals.doctorManagerLangs;
		const { selectedDoctorId, priceList, paymentList, provinceList, specialityList } = this.state;

		return (
			<div className='doctorManager-content container'>
				<span className='doctorManager-title'>
					<FormattedMessage id={doctorContentL} />
				</span>
				<div className='doctorManager-select'>
					<DoctorSelect
						selectedDoctorId={selectedDoctorId}
						handleOnchange={this.handleOnchange}
					/>
				</div>

				<div className='doctorManager-extra'>
					<div className='extra-select'>
						{priceList &&
							priceList.length > 0 &&
							paymentList.length > 0 &&
							provinceList.length > 0 &&
							this.renderDoctorExtraSelect()}
					</div>
					<div className='extra-input'>
						{priceList &&
							priceList.length > 0 &&
							paymentList.length > 0 &&
							provinceList.length > 0 &&
							this.renderDoctorExtraInput()}
					</div>
					<div className='extra-select'>
						{specialityList && specialityList.length > 0 && this.renderDoctorExtraSelect2()}
					</div>
				</div>

				<div className='doctorManager-desc'>{this.renderDesc()}</div>
				<div className='doctorManager-markdown'>{this.renderMdEditor()}</div>
				<div className='btn-grouped'>
					<div
						className='BTN BTN-danger btn-cancel'
						onClick={this.handleCancel}
					>
						<FormattedMessage id={cancelBtnL} />
					</div>
					<div
						className='BTN BTN-default btn-save'
						onClick={this.handleSubmit}
					>
						<FormattedMessage id={savebtnL} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ appReducer, adminReducer }) => ({
	allSpecialitiesForSystem: adminReducer.allSpecialitiesForSystem,
	language: appReducer.language,
	allcodesExtra: adminReducer.allcodesExtra,
});

const mapDispatchToProps = (dispatch) => ({
	getAllSpecialitiesFn: () => dispatch(combinedActions.getAllSpecialitiesFn()),
	getDoctorExtraInfoByIdFn: (id) => dispatch(combinedActions.getDoctorExtraInfoByIdFn(id)),
	createDoctorExtraInfoByIdFn: (newData) =>
		dispatch(combinedActions.createDoctorExtraInfoByIdFn(newData)),
	getAllcodesExtraFn: () => dispatch(combinedActions.getAllcodesExtraFn()),
	getDoctorContentByIdFn: (id) => dispatch(combinedActions.getDoctorContentByIdFn(id)),
	createDoctorMarkdownFn: (data) => dispatch(combinedActions.createDoctorMarkdownFn(data)),
	getAllDoctorsFn: () => dispatch(combinedActions.getAllDoctorsFn()),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManager);
