import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SpecialityManager.scss';
import Commons from '../../../utilities/Commons';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import * as constVals from '../../../utilities';
import SelectInputCustom from '../../../components/selectInputCustom/SelectInputCustom';
import ImageFileComp from '../../../components/imgFileComp/ImageFileComp';
import * as combinedActions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt();
class SpecialityManager extends Component {
	state = {
		specialityId: '',
		specialityList: [
			{ value: 'test1', keymap: '1' },
			{ value: 'test2', keymap: '2' },
			{ value: 'test3', keymap: '3' },
		],

		htmlContent: '',
		textContent: '',

		imgFile: null,
		createSpeciality: '',
		toggleClear: false,
	};

	renderSelectInputCustom = () => {
		const enLang = this.props.language === constVals.LANGUAGES.EN;
		const { specialityList, specialityId, createSpeciality } = this.state;
		const { specialityIdN, createSpecialityN } = constVals.nameKeysValues;

		const specialityManagerFields = [
			{
				name: specialityIdN,
				label: enLang ? 'Specialities' : 'Chọn chuyên môn',
				optionList: specialityList,
				selectedKey: createSpeciality ? '' : specialityId,
				disabled: createSpeciality ? true : false,
			},
			{
				name: createSpecialityN,
				label: <FormattedMessage id={constVals.specialityManagerLangs.createSpecialityL} />,
				selectedKey: createSpeciality,
				inputType: true,
			},
		];

		return specialityManagerFields.map((props, idx) => {
			return (
				<SelectInputCustom
					key={idx}
					{...props}
					handleInput={this.handleInput}
				/>
			);
		});
	};

	handleInput = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	getImgFile = (imgFile) => {
		this.setState({ imgFile });
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

	clearForm = () => {
		this.setState({
			htmlContent: '',
			textContent: '',
			specialityId: '1',
			imgFile: null,
			createSpeciality: '',
			toggleClear: !this.state.toggleClear,
		});
	};

	cancel = () => {
		if (window.confirm(`Do you really want to reset ?`)) {
			this.clearForm();
		}
	};

	submitForm = async () => {
		const { htmlContent, textContent, imgFile, createSpeciality } = this.state;
		const dataConvertedForCheck = {
			image: imgFile,
			content: htmlContent,
			speciality: createSpeciality,
		};

		const isValid = await Commons.checkFieldValidations(dataConvertedForCheck);
		if (isValid) {
			const { createSpecialityFn, toggleLoadingGif } = this.props;
			const dataConvertedForDb = {
				name: createSpeciality,
				htmlDesc: htmlContent,
				textDesc: textContent,
				image: imgFile ? await Commons.convertFileToBase64(imgFile) : '',
			};

			toggleLoadingGif();
			let result = await createSpecialityFn(dataConvertedForDb);
			if (result.errCode === constVals.defaultValues.noErrors) {
				this.clearForm();
			}
			Commons.onToastTimeoutTrigger({ toggleLoadingGif, result });
		}
	};

	render() {
		const { specialityManagerL, savebtnL, cancelBtnL } = constVals.specialityManagerLangs;

		return (
			<div className='specialityManager-content container'>
				<span className='specialityManager-title'>
					<FormattedMessage id={specialityManagerL} />
				</span>
				<div className='specialityManager-image'>
					<ImageFileComp
						toggleClear={this.state.toggleClear}
						getImgFile={this.getImgFile}
					/>
				</div>
				<div className='specialityManager-selectInputCustom'>{this.renderSelectInputCustom()}</div>
				<div className='specialityManager-markdown'>{this.renderMdEditor()}</div>
				<div className='btn-grouped'>
					<div
						className='BTN BTN-danger btn-cancel'
						onClick={this.cancel}
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
const mapStateToProps = ({ appReducer }) => ({
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
	createSpecialityFn: (newData) => dispatch(combinedActions.createSpecialityFn(newData)),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SpecialityManager);
