import React, { Component } from 'react';
import Eye from '../eye/Eye';
import { connect } from 'react-redux';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';
import * as constVals from '../../utilities/index';
import { FormattedMessage } from 'react-intl';
import * as combinedActions from '../../store/actions';
import Commons from '../../utilities/Commons';

class FormCustomized extends Component {
	state = {
		isHide: true,
		roleArr: [],
		genderArr: [],
		postitionArr: [],
		fullPreviewImg: false,
	};

	componentDidMount = async () => {
		const { roleArr, genderArr, postitionArr } = this.state;
		if (roleArr.length === 0 || genderArr.length === 0 || postitionArr.length === 0) {
			await this.mappingAllDataToState();
		}
	};

	mappingAllDataToState = async () => {
		const userAllcodes = await this.filterUserAllcodes();

		if (userAllcodes.havingData) {
			this.setState({
				...userAllcodes.arrs,
			});
		}
	};

	filterUserAllcodes = async () => {
		const roleArr = [];
		const genderArr = [];
		const postitionArr = [];
		const { getUserAllcodesFn } = this.props;
		const { noErrors } = constVals.defaultValues;
		let havingData = false;

		const result = await getUserAllcodesFn();

		if (result.errCode === noErrors) {
			const { roleType, genderType, positionType } = constVals.typeKeyValue;
			const list = result.records;
			const length = list.length;
			havingData = true;

			for (let idx = 0; idx < length; idx++) {
				if (list[idx].type === roleType) {
					roleArr.push(list[idx]);
				} else if (list[idx].type === genderType) {
					genderArr.push(list[idx]);
				} else if (list[idx].type === positionType) {
					postitionArr.push(list[idx]);
				}
			}
		} else {
			Commons.onToastTimeoutTrigger({ result });
		}

		return {
			havingData,
			arrs: {
				roleArr,
				genderArr,
				postitionArr,
			},
		};
	};

	triggerEyes = () => {
		this.setState({
			isHide: !this.state.isHide,
		});
	};

	renderEyes = () => {
		return (
			<Eye
				isHide={this.state.isHide}
				triggerEyes={this.triggerEyes}
			/>
		);
	};

	renderLabel = (label, name, type) => {
		const { avatar } = constVals.nameKeysValues;
		const { chooseImgL } = constVals.modalLangs;
		const { passwordType, fileType } = constVals.typeKeyValue;

		let customLabel = null;
		const labelEle = <Label for={`${name}For`}>{label}</Label>;

		if (type === passwordType) {
			const { isUpdate } = this.props;

			let isRenderEyes = false;
			if (isUpdate === false) isRenderEyes = true;

			customLabel = (
				<div className='password-eyes'>
					{labelEle}
					{isRenderEyes && this.renderEyes()}
				</div>
			);
		} else if (name === avatar && type === fileType) {
			const { children, ...restProps } = labelEle.props;
			const FileLabel = () => (
				<Label
					{...restProps}
					className='label-as-fileInput'
				>
					<i className='fas fa-upload' /> <FormattedMessage id={chooseImgL} />
				</Label>
			);
			customLabel = (
				<>
					<Label>{label}</Label>
					<FileLabel />
				</>
			);
		}

		return customLabel ? customLabel : labelEle;
	};

	renderImgUrl = (imgUrl) => {
		return (
			<div
				className='imgBgr preview-image'
				style={{ backgroundImage: `url(${imgUrl})` }}
			></div>
		);
	};

	chooseTypeInput = (type) => {
		let usingType = null;
		const { fileType, passwordType, selectType, emailType, textType, numType, datePickerType } =
			constVals.typeKeyValue;

		if (type === emailType) {
			usingType = emailType;
		} else if (type === passwordType) {
			if (this.state.isHide === false) {
				usingType = textType;
			} else usingType = passwordType;
		} else if (type === fileType) {
			usingType = fileType;
		} else if (type === selectType) {
			usingType = selectType;
		} else if (type === numType) {
			usingType = numType;
		} else if (type === datePickerType) {
			usingType = datePickerType;
		} else {
			usingType = textType;
		}

		return usingType;
	};

	selectOptions = (name) => {
		let tempArr = [];
		const Enlang = this.props.language === constVals.LANGUAGES.EN;
		const { gender, role, position } = constVals.nameKeysValues;

		if (name === gender) {
			tempArr = this.state.genderArr;
		} else if (name === role) {
			tempArr = this.state.roleArr;
		} else if (name === position) {
			tempArr = this.state.postitionArr;
		}

		const options = tempArr.map((item, idx) => {
			return (
				<option
					key={idx}
					value={item.keymap}
				>
					{Enlang ? item.valueEN : item.valueVI}
				</option>
			);
		});
		return options;
	};

	renderInput = (aCol) => {
		const { isUpdate } = this.props;
		const { avatar } = constVals.nameKeysValues;
		const { fileType, passwordType, selectType, emailType, datePickerType } = constVals.typeKeyValue;

		let hidden = false;
		let disabled = false;
		let fileValue = false;
		let callingSelectOpts = false;
		let isdateType = false;

		let { name, type, value, component } = aCol;
		let usingType = this.chooseTypeInput(type);
		const autoComplete = usingType === passwordType ? 'off' : 'on';

		if (isUpdate && (usingType === passwordType || usingType === emailType)) {
			disabled = true;
		} else if (usingType === fileType && name === avatar) {
			hidden = true;
			fileValue = value;
			value = '';
		} else if (usingType === selectType) {
			callingSelectOpts = true;
		} else if (usingType === datePickerType) {
			isdateType = true;
		}

		if (isdateType) {
			return component;
		} else {
			return (
				<>
					<Input
						id={`${name}For`}
						name={name}
						value={value}
						hidden={hidden}
						type={usingType}
						selected
						disabled={disabled}
						autoComplete={autoComplete}
						onChange={this.props.handleInput}
					>
						{callingSelectOpts ? this.selectOptions(name) : null}
					</Input>
					{fileValue ? this.renderImgUrl(fileValue) : null}
				</>
			);
		}
	};

	customARow = (list, key) => {
		return (
			<Row key={key}>
				{list.map((aCol, idx) => {
					const { colNumber, label, name, type } = aCol;
					return (
						<Col
							key={idx}
							md={colNumber}
						>
							<FormGroup>
								{this.renderLabel(label, name, type)}
								{this.renderInput(aCol)}
							</FormGroup>
						</Col>
					);
				})}
			</Row>
		);
	};

	handleFormRow = (fieldGroups) => {
		const tempList = fieldGroups.map((aGroup, idx) => {
			return this.customARow(aGroup, idx);
		});

		return tempList;
	};

	render() {
		return <div>{this.handleFormRow(this.props.fieldGroups)}</div>;
	}
}

const mapStateToProps = ({ appReducer }) => ({
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
	getUserAllcodesFn: () => dispatch(combinedActions.getUserAllcodesFn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormCustomized);
