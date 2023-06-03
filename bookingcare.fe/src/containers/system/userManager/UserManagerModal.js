import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import './UserManagerModal.scss';
import Commons from '../../../utilities/Commons';
import FormCustomized from '../../../components/formCustomized/FormCustomized';
import * as constVals from '../../../utilities';
import * as combinedActions from '../../../store/actions';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { apiStates } from '../../../supplies/apiSupplies';
import withRouterHOC from '../../../hoc/withRouterHOC';
import { compose } from 'redux';

//pnTran123332@email.co

class UserManagerModal extends Component {
	state = {
		imgUrl: '',
		open: false,
		isUpdate: false,
		noChanges: true,

		userForm: {
			email: 'pnTran123332@email.co',
			password: 'PhanTai@123',
			firstname: 'Trân',
			lastname: 'Phạm Ngọc',
			phone: '09123123123',
			address: 'An Giang province',
			gender: constVals.defaultKeys.maleGender,
			position: constVals.defaultKeys.doctorPos,
			role: constVals.defaultKeys.adminRole,
			avatar: '',
		},
		comparingUserForm: {},
	};

	componentDidUpdate = async (prevProps, prevState) => {
		const { openModal, isUpdate, userSelected } = this.props;
		if (openModal !== prevProps.openModal) {
			let userFormConverted = null;

			if (isUpdate && userSelected) {
				const noPassword = 'your-password';
				userFormConverted = {
					...userSelected,
					password: noPassword,
				};
				this.modalWithUpdateUser(isUpdate, userFormConverted);
			} else this.toggleModal();
		} else await this.handleNoChanges();
	};

	compare2userForms = async () => {
		let noChanges = true;
		const { imgUrl, isUpdate } = this.state;
		const { avatar } = constVals.nameKeysValues;

		if (isUpdate && imgUrl) {
			noChanges = false;
		} else {
			const { comparingUserForm, userForm } = this.state;
			for await (const key of Object.keys(comparingUserForm)) {
				if (key !== avatar) {
					if (userForm[key] !== comparingUserForm[key]) {
						noChanges = false;
						break;
					}
				}
			}
		}

		return noChanges;
	};

	handleNoChanges = async () => {
		const { isUpdate, noChanges } = this.state;
		if (isUpdate && (await this.compare2userForms()) === false && noChanges === true) {
			this.setState({ noChanges: false });
		} else if (isUpdate && (await this.compare2userForms()) === true && noChanges === false) {
			this.setState({ noChanges: true });
		}
	};

	modalWithUpdateUser = (isUpdate = false, userUpdated = null) => {
		this.setState({
			isUpdate: isUpdate,
			open: !this.state.open,
			userForm: { ...this.state.userForm, ...userUpdated },
			comparingUserForm: { ...this.state.userForm, ...userUpdated },
		});
	};

	toggleModal = () => {
		this.setState({
			open: !this.state.open,
		});
	};

	handleFileInput = (fileObj) => {
		if (fileObj) {
			return Commons.convertFileToUrl(fileObj);
		} else return null;
	};

	handleInput = async (event) => {
		let fileObj = null;
		let imgUrl = null;
		const { name, value, type } = event.target;

		if (type === constVals.typeKeyValue.fileType && name === constVals.nameKeysValues.avatar) {
			fileObj = event.target.files[0];
			imgUrl = this.handleFileInput(fileObj);
		}

		if (imgUrl && fileObj) {
			this.setState({
				imgUrl,
				userForm: {
					...this.state.userForm,
					[name]: fileObj,
				},
			});
		} else {
			this.setState({
				userForm: {
					...this.state.userForm,
					[name]: value,
				},
			});
		}
	};

	customFieldGroups = () => {
		const { imgUrl, userForm } = this.state;
		const { email, password, firstname, lastname, phone, address, gender, position, role, avatar } =
			userForm;

		const { nameKeysValues, typeKeyValue } = constVals;
		const { fileType, passwordType, selectType, emailType, textType, numType } = typeKeyValue;
		const { genderL, positionL, roleL, phoneL, avatarL, name1stL, lastnameL, addressL, passwordL } =
			constVals.modalLangs;

		const userManagerFieldGroups = [
			//email, password
			[
				{
					label: 'Email',
					name: nameKeysValues.email,
					type: emailType,
					value: email,
					colNumber: 6,
				},
				{
					label: <FormattedMessage id={passwordL} />,
					name: nameKeysValues.password,
					type: passwordType,
					value: password,
					colNumber: 6,
				},
			],

			// 1st/lastname
			[
				{
					label: <FormattedMessage id={name1stL} />,
					name: nameKeysValues.firstname,
					type: textType,
					value: firstname,
					colNumber: 6,
				},
				{
					label: <FormattedMessage id={lastnameL} />,
					name: nameKeysValues.lastname,
					type: textType,
					value: lastname,
					colNumber: 6,
				},
			],

			//gender, pos, role, phone
			[
				{
					label: <FormattedMessage id={genderL} />,
					name: nameKeysValues.gender,
					type: selectType,
					value: gender,
					colNumber: 3,
				},
				{
					label: <FormattedMessage id={positionL} />,
					name: nameKeysValues.position,
					type: selectType,
					value: position,
					colNumber: 3,
				},
				{
					label: <FormattedMessage id={roleL} />,
					name: nameKeysValues.role,
					type: selectType,
					value: role,
					colNumber: 3,
				},
				{
					label: <FormattedMessage id={phoneL} />,
					name: nameKeysValues.phone,
					type: numType,
					value: phone,
					colNumber: 3,
				},
			],

			//address, avatar
			[
				{
					label: <FormattedMessage id={addressL} />,
					name: nameKeysValues.address,
					type: textType,
					value: address,
					colNumber: 9,
				},
				{
					label: <FormattedMessage id={avatarL} />,
					name: nameKeysValues.avatar,
					type: fileType,
					value: imgUrl ? imgUrl : avatar,
					colNumber: 3,
				},
			],
		];

		return (
			<FormCustomized
				isUpdate={this.state.isUpdate}
				fieldGroups={userManagerFieldGroups}
				handleInput={this.handleInput}
			/>
		);
	};

	checkFieldValidations_Origin = async (valObject, isUpdate = false) => {
		let isValid = true;
		const { email, password } = constVals.nameKeysValues;

		for (const key in valObject) {
			if (valObject[key] === null || valObject[key] === undefined || valObject[key] === '') {
				if (key === constVals.nameKeysValues.avatar) {
				} else isValid = false;
			} else if (key === email && isUpdate === false) {
				isValid = await Commons.checkEmailRegex(valObject[key]);
			} else if (key === password && isUpdate === false) {
				isValid = await Commons.checkPasswordRegex(valObject[key]);
			} else if (key === password) {
				isValid = await Commons.checkPasswordRegex(valObject[key]);
			}

			if (isValid === false) {
				if (key === password) {
					alert(`Your "${key}" must be greater 8 chars including: aB1@, ..vv `);
				} else alert(`Your "${key}" is incorrect`);

				break;
			}
		}
		return isValid;
	};

	handleSubmit = async () => {
		const { userForm, isUpdate } = this.state;
		const isValid = await Commons.checkFieldValidations(userForm, isUpdate);

		if (isValid) {
			let result = null;
			let avatarConverted = null;
			const { GetAllUsersFn, toggleLoadingGif } = this.props;
			const { id, avatar, role, phone, position, ...restData } = userForm;
			const { jsObjType } = constVals.typeKeyValue;

			if (avatar && typeof avatar === jsObjType) {
				avatarConverted = await Commons.convertFileToBase64(avatar);
			}

			const dataConvertedForDb = {
				...restData,
				roleId: userForm.role,
				phoneNumber: userForm.phone,
				positionId: userForm.position,
				avatar: avatarConverted ? avatarConverted : avatar,
			};

			toggleLoadingGif();
			if (isUpdate) {
				const dataForUpdate = {
					...dataConvertedForDb,
					password: undefined,
					email: undefined,
					id,
				};

				console.log('dataForUpdate ---', dataForUpdate);
				result = await this.props.updateAnUserFn(dataForUpdate);
			} else {
				console.log('dataConvertedForDb ---', dataConvertedForDb);
				result = await this.props.createAccountFn(dataConvertedForDb);
			}

			if (result && result.errCode === constVals.defaultValues.noErrors) {
				await GetAllUsersFn();
				this.resetForm();
				this.props.resetUserManager();
			} else result = { ...apiStates.serverError };

			Commons.onToastTimeoutTrigger({ result, toggleLoadingGif });
		}
	};

	resetForm = () => {
		const { maleGender, doctorPos, adminRole } = constVals.defaultKeys;
		this.setState({
			imgUrl: '',
			open: false,
			noChanges: true,
			isUpdate: false,

			userForm: {
				email: '',
				password: '',
				firstname: '',
				lastname: '',
				phone: '',
				address: '',
				gender: maleGender,
				position: doctorPos,
				role: adminRole,
				avatar: '',
			},

			comparingUserForm: {},
		});
	};

	render() {
		const { open, isUpdate } = this.state;
		const { createL } = constVals.modalLangs;
		const { createBtnL, cancelBtnL, updateL, updateBtnL } = constVals.modalLangs;

		return (
			<Modal
				isOpen={open}
				className='modal-customized userManagerClass'
			>
				<ModalHeader toggle={this.toggleModal}>
					{isUpdate ? <FormattedMessage id={updateL} /> : <FormattedMessage id={createL} />}
				</ModalHeader>
				<ModalBody>
					<Form>{this.customFieldGroups()}</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						color='secondary'
						onClick={this.resetForm}
					>
						<FormattedMessage id={cancelBtnL} />
					</Button>
					<Button
						color='primary'
						onClick={this.handleSubmit}
						disabled={this.state.noChanges && isUpdate}
					>
						{isUpdate ? <FormattedMessage id={updateBtnL} /> : <FormattedMessage id={createBtnL} />}
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
	GetAllUsersFn: () => dispatch(combinedActions.GetAllUsersFn()),
	updateAnUserFn: (newData) => dispatch(combinedActions.updateAnUserFn(newData)),
	createAccountFn: (newData) => dispatch(combinedActions.createAccountFn(newData)),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default compose(
	withRouterHOC,
	connect(mapStateToProps, mapDispatchToProps),
)(UserManagerModal);
