import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './PatientManager.scss';
import * as combinedActions from '../../../store/actions';
import DatePickerCustom from '../../../components/datePicker/DatePickerCustom';
import Commons from '../../../utilities/Commons';
import * as constVals from '../../../utilities';
import BillModal from './billModal/BillModal';
import { FormattedMessage, injectIntl } from 'react-intl';
import withRouterHOC from '../../../hoc/withRouterHOC';

class PatientManager extends Component {
	state = {
		startDate: new Date(),
		dateSelected: constVals.defaultValues.selecteALL,

		openModal: false,
		modalData: {
			id: null,
			email: null,
			doctorId: null,
		},
	};

	componentDidMount = async () => {
		const { patientList, getPatientManagerByDoctorIdFn, userInfo } = this.props;
		const { id } = userInfo;
		if (!patientList) {
			await getPatientManagerByDoctorIdFn(id);
		}
	};

	getDatePicker = (date) => {
		let dateConverted = Commons.convertObjDateTo_DMYstr(date);
		dateConverted = Commons.convertDateToTimestamp(dateConverted);

		this.setState({
			startDate: date,
			dateSelected: dateConverted,
		});
	};

	renderTable = (list) => {
		let listCloned = [...list];
		listCloned = listCloned.sort((a, b) => b.dateBooked - a.dateBooked);

		let num = 1;
		const body = [];
		const enLang = this.props.language === constVals.LANGUAGES.enLang;

		listCloned.forEach((objItem, idx) => {
			const {
				id,
				address,
				dateBooked,
				email,
				firstname,
				genderDataBooking,
				lastname,
				phone,
				getTimetypeVal,
			} = objItem;

			if (
				this.state.dateSelected === dateBooked ||
				this.state.dateSelected === constVals.defaultValues.selecteALL
			) {
				const { sendBillL } = constVals.patientManagers;

				const item = (
					<tr key={idx}>
						<td className='numeric'>{num++}</td>
						<td className='customCol'>{Commons.handleFullname(firstname, lastname)}</td>
						<td>{phone}</td>
						<td>{enLang ? genderDataBooking.valueEN : genderDataBooking.valueVI}</td>
						<td className='customCol'>{email}</td>
						<td>{address}</td>
						<td>{Commons.convertTimestampTo_DMYstr(dateBooked)}</td>
						<td>{enLang ? getTimetypeVal.valueEN : getTimetypeVal.valueVI}</td>
						<td className='action-btn'>
							<button
								type='button'
								className='BTN BTN-default'
								onClick={() => this.handleConfirm(id, email)}
							>
								<FormattedMessage id={sendBillL} />
							</button>
						</td>
					</tr>
				);
				body.push(item);
			}
		});

		const table = (
			<>
				<thead className='table-success'>
					<tr>
						<th scope='col'>No.</th>
						<th scope='col'>Fullname</th>
						<th scope='col'>Phone</th>
						<th scope='col'>Gender</th>
						<th scope='col'>Email</th>
						<th scope='col'>Address</th>
						<th scope='col'>Date Booked</th>
						<th scope='col'>Time</th>
						<th scope='col'>Actions</th>
					</tr>
				</thead>

				<tbody className='table-body'>
					{body.length > 0 ? (
						body
					) : (
						<tr>
							<td
								colSpan='9'
								style={{ textAlign: 'center' }}
							>
								No data
							</td>
						</tr>
					)}
				</tbody>
			</>
		);

		return table;
	};

	handleConfirm = (id, email) => {
		this.setState({
			openModal: !this.state.openModal,
			modalData: {
				...this.state.modalData,
				id,
				email,
				doctorId: this.props.userInfo.id,
			},
		});
	};

	getPatientListBtn = () => {
		const { selecteALL } = constVals.defaultValues;
		if (this.state.dateSelected !== selecteALL) {
			this.setState({
				dateSelected: selecteALL,
				startDate: new Date(),
			});
		}
	};

	render() {
		const { patientList } = this.props;
		const { startDate, openModal, modalData } = this.state;
		const { resetL, patientManagerL } = constVals.patientManagers;

		return (
			<>
				<div className='patientManager-content container'>
					<div className='patientManager-title'>
						<FormattedMessage id={patientManagerL} />
					</div>
					<div className='patientManager-dateSelected col-6'>
						<DatePickerCustom
							startDate={startDate}
							getDatePicker={this.getDatePicker}
						/>
						<div
							className='BTN BTN-default'
							onClick={this.getPatientListBtn}
						>
							<FormattedMessage id={resetL} />
						</div>
					</div>
					<table className='table table-sm table-hover table-bordered'>
						{patientList && patientList.length > 0 && this.renderTable(patientList)}
					</table>
				</div>
				<div>
					{
						<BillModal
							openModal={openModal}
							modalData={modalData}
						/>
					}
				</div>
			</>
		);
	}
}
const mapStateToProps = ({ appReducer, userReducer, adminReducer }) => ({
	patientList: adminReducer.patientList,
	userInfo: userReducer.userInfo,
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
	getPatientManagerByDoctorIdFn: (id) => dispatch(combinedActions.getPatientManagerByDoctorIdFn(id)),
});

export default compose(
	injectIntl,
	withRouterHOC,
	connect(mapStateToProps, mapDispatchToProps),
)(PatientManager);
