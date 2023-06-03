import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as combinedActions from '../../../../store/actions';
import './BillModal.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
import ImageFileComp from '../../../../components/imgFileComp/ImageFileComp';
import Commons from '../../../../utilities/Commons';
import FormCustomized from '../../../../components/formCustomized/FormCustomized';
import * as constVals from '../../../../utilities';

class BillModal extends Component {
	state = {
		isOpen: false,
		fileName: null,
		modalData: {
			id: null,
			img: null,
			email: '',
			patientId: null,
			doctorId: null,
		},
	};
	componentDidMount = () => {};

	componentDidUpdate = (prevProps) => {
		const { openModal, modalData } = this.props;
		if (openModal !== prevProps.openModal) {
			this.setState({
				isOpen: true,
				modalData: { ...modalData, img: null },
			});
		}
	};

	closeModalFn = () => {
		this.resetForm();
	};

	getImgFile = async (file) => {
		this.setState({
			fileName: file.name,
			modalData: {
				...this.state.modalData,
				img: file,
			},
		});
	};

	resetForm = () => {
		this.setState({
			isOpen: false,
			fileName: null,

			modalData: {
				id: null,
				img: null,
				email: '',
				patientId: null,
			},
		});
	};

	submitModal = async () => {
		const { modalData } = this.state;
		const isValid = await Commons.checkFieldValidations(modalData);
		const enLang = this.props.language === constVals.LANGUAGES.EN;

		if (isValid) {
			const { sendBillToPatientEmailFn, toggleLoadingGif, getPatientManagerByDoctorIdFn } = this.props;
			const dataConvertedForDb = {
				...modalData,
				img: await Commons.convertFileToBase64(modalData.img),
				enLang,
			};

			toggleLoadingGif();
			let result = await sendBillToPatientEmailFn(dataConvertedForDb);
			if (result && result.errCode === constVals.defaultValues.noErrors) {
				this.resetForm();
				await getPatientManagerByDoctorIdFn(modalData.doctorId);
			}
			Commons.onToastTimeoutTrigger({ result, toggleLoadingGif });
		}
	};

	customFieldGroups = () => {
		const { email } = this.state.modalData;
		const { textType } = constVals.typeKeyValue;

		const bookingFieldGroups = [
			[
				{
					label: 'Email',
					name: 'email',
					type: textType,
					value: email,
					colNumber: 6,
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

	render() {
		const { isOpen, modalData, fileName } = this.state;
		const { email } = modalData;

		return (
			<>
				<Modal
					isOpen={isOpen}
					centered
					className='modal-customized billModal-content'
				>
					<ModalHeader toggle={this.closeModalFn}>Send the bill to the patient</ModalHeader>
					<ModalBody>
						<Input
							type='email'
							name='email'
							value={email && email}
							disabled
							placeholder='Patient email...'
						/>
						<div className='modal-imgFile'>
							<ImageFileComp
								getImgFile={this.getImgFile}
								onlyGetImgName={true}
							/>
							<span>{fileName && fileName}</span>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							color='danger'
							onClick={this.closeModalFn}
						>
							Cancel
						</Button>
						<Button
							color='primary'
							onClick={this.submitModal}
						>
							Send
						</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

const mapStateToProps = ({ appReducer }) => ({
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
	getPatientManagerByDoctorIdFn: (id) => dispatch(combinedActions.getPatientManagerByDoctorIdFn(id)),

	sendBillToPatientEmailFn: (newData) => dispatch(combinedActions.sendBillToPatientEmailFn(newData)),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillModal);
