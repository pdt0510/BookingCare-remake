import React, { Component } from 'react';
import './DoctorExtra.scss';
import { connect } from 'react-redux';
import * as combinedActions from '../../store/actions';

class DoctorExtra extends Component {
	renderSelect = (list) => {
		const { selectedKey, name, label } = this.props;
		return (
			<>
				<label className='doctorExtra-label'>{label}</label>
				<select
					name={name}
					value={selectedKey}
					className='select-input-custom forSelect'
					onChange={this.selectOnchange}
				>
					{list && list.length > 0 && this.renderSelectOpts(list)}
				</select>
			</>
		);
	};

	renderInput = () => {
		const { selectedKey, name, label } = this.props;
		return (
			<>
				<label
					className='doctorExtra-label'
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
					onChange={this.selectOnchange}
				/>
			</>
		);
	};

	renderSelectOpts = (list) => {
		const optList = list.map((item, idx) => {
			const { keymap, value } = item;

			return (
				<option
					key={idx + 1}
					value={keymap}
				>
					{value}
				</option>
			);
		});

		return optList;
	};

	selectOnchange = async (event) => {
		await this.props.handleOnchange(event);
	};

	render() {
		const { optionList, inputType } = this.props;

		return (
			<div className='doctorExtra-content'>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
