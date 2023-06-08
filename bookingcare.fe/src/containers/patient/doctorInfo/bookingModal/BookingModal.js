import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import './BookingModal.scss';
import Commons from '../../../../utilities/Commons';
import FormCustomized from '../../../../components/formCustomized/FormCustomized';
import * as constVals from '../../../../utilities';
import * as combinedActions from '../../../../store/actions';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import DoctorIntro from '../doctorIntro/DoctorIntro';
import DatePickerCustom from '../../../../components/datePicker/DatePickerCustom';
import { v4 as uuidv4 } from 'uuid';

class BookingModal extends Component {
	state = {
		open: false,
		doctorPrice: null,
		doctorName: null,
		bookingForm: {
			// email: '',
			// firstname: '',
			// lastname: '',
			// phone: '',
			// address: '',

			email: 'phanductai920510@gmail.com',
			firstname: 'Tai',
			lastname: 'PD',
			phone: '09123123123',
			address: 'tp.HCM',
			birthday: new Date(),
			gender: constVals.defaultKeys.maleGender,
		},
	};

	componentDidUpdate = async (prevProps) => {
		if (prevProps.language !== this.props.language) {
			this.setState({ doctorPrice: null, doctorName: null });
		} else if (this.props.toggleModal !== prevProps.toggleModal) {
			this.toggleModalFn();
		}
	};

	toggleModalFn = () => {
		this.setState({
			open: !this.state.open,
		});
	};

	handleInput = async (event) => {
		const { name, value } = event.target;

		this.setState({
			bookingForm: {
				...this.state.bookingForm,
				[name]: value,
			},
		});
	};

	getDatePicker = (date) => {
		this.setState({
			bookingForm: {
				...this.state.bookingForm,
				birthday: date,
			},
		});
	};

	customFieldGroups = () => {
		const { email, firstname, lastname, phone, address, gender, birthday } = this.state.bookingForm;

		const { nameKeysValues, typeKeyValue, modalLangs } = constVals;
		const { selectType, emailType, textType, numType, datePickerType } = typeKeyValue;
		const { genderL, phoneL, name1stL, lastnameL, addressL, birthdayL } = modalLangs;

		const bookingFieldGroups = [
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

			[
				{
					label: 'Email',
					name: nameKeysValues.email,
					type: emailType,
					value: email,
					colNumber: 6,
				},
				{
					label: <FormattedMessage id={phoneL} />,
					name: nameKeysValues.phone,
					type: numType,
					value: phone,
					colNumber: 6,
				},
			],

			[
				{
					label: <FormattedMessage id={birthdayL} />,
					name: nameKeysValues.birthday,
					type: datePickerType,
					value: birthday,
					colNumber: 6,
					component: (
						<DatePickerCustom
							maxDate={true}
							startDate={birthday}
							getDatePicker={this.getDatePicker}
						/>
					),
				},
				{
					label: <FormattedMessage id={genderL} />,
					name: nameKeysValues.gender,
					type: selectType,
					value: gender,
					colNumber: 6,
				},
			],

			[
				{
					label: <FormattedMessage id={addressL} />,
					name: nameKeysValues.address,
					type: textType,
					value: address,
					colNumber: 12,
				},
			],
		];

		return (
			<FormCustomized
				fieldGroups={bookingFieldGroups}
				handleInput={this.handleInput}
			/>
		);
	};

	checkFieldValidations = async (valObject) => {
		let isValid = true;
		const { email } = constVals.nameKeysValues;

		for (const key in valObject) {
			if (valObject[key] === null || valObject[key] === undefined || valObject[key] === '') {
				isValid = false;
			} else if (key === email) {
				isValid = await Commons.checkEmailRegex(valObject[key]);
			}

			if (isValid === false) {
				alert(`Your "${key}" is incorrect`);

				break;
			}
		}
		return isValid;
	};

	handleSubmit = async () => {
		const isValid = await this.checkFieldValidations(this.state.bookingForm);

		if (isValid) {
			const { toggleLoadingGif, bookingInfo, createBookingAccFn } = this.props;
			const { noErrors } = constVals.defaultValues;
			const token = uuidv4();

			const dataConvertedForBookings = {
				doctorId: this.props.doctorId,
				birthday: +Commons.convertDateToTimestamp(this.state.bookingForm.birthday),
				timeType: bookingInfo.timeType,
				dateBooked: +bookingInfo.dateBooked,
				statusId: constVals.defaultKeys.new,
				token,
				...this.state.bookingForm,
			};

			toggleLoadingGif();
			let result = await createBookingAccFn(dataConvertedForBookings);

			if (result && result.errCode === noErrors) {
				const dateConvertForEmail = {
					clientEmail: this.state.bookingForm.email,
					emailInfo: this.getEmailInfo(token),
				};

				result = await this.props.sendInfoToEmailFn(dateConvertForEmail);
				if (result && result.errCode === noErrors) {
					this.resetForm();
				}
			}
			Commons.onToastTimeoutTrigger({ result, toggleLoadingGif });
		}
	};

	resetForm = () => {
		this.setState({
			open: false,
			bookingForm: {
				email: '',
				firstname: '',
				lastname: '',
				phone: '',
				address: '',
				gender: constVals.defaultKeys.maleGender,
				birthday: new Date(),
			},
		});
	};

	getEmailInfo = (token) => {
		const { doctorPrice, doctorName, bookingForm } = this.state;
		const { firstname, lastname } = bookingForm;

		const { language, doctorId, bookingInfo } = this.props;
		const { time, dateBookedStr } = bookingInfo;

		const fullname = Commons.handleFullname(firstname, lastname, language);
		const redirectLink = `${process.env.REACT_APP_REDIRECT_URL}/verify-booking/token=${token}/doctorId=${doctorId}`;

		return {
			enLang: language,
			fullname,
			doctorPrice,
			bookedTime: time,
			bookedDate: dateBookedStr,
			doctorName,
			redirectLink,
		};
	};

	getDoctorIntro = ({ priceVal, fullname }) => {
		const { doctorPrice, doctorName } = this.state;
		if (!doctorPrice && !doctorName) {
			this.setState({ doctorPrice: priceVal, doctorName: fullname });
		}
	};

	render() {
		const { open } = this.state;
		const { doctorId, bookingInfo } = this.props;
		const { cancelBtnL, bookingL } = constVals.modalLangs;

		return (
			<Modal
				isOpen={open}
				className='modal-customized bookingClass'
			>
				<ModalHeader toggle={this.toggleModalFn}>Booking modal</ModalHeader>
				{open && (
					<DoctorIntro
						doctorId={doctorId}
						bookingInfo={bookingInfo}
						getDoctorIntro={this.getDoctorIntro}
					/>
				)}
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
					>
						<FormattedMessage id={bookingL} />
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = ({ appReducer }) => ({
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
	sendInfoToEmailFn: (newData) => dispatch(combinedActions.sendInfoToEmailFn(newData)),
	createBookingAccFn: (newData) => dispatch(combinedActions.createBookingAccFn(newData)),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
