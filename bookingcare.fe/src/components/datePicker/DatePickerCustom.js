import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './DatePickerCustom.scss';
import * as constVals from '../../utilities';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { vi } from 'date-fns/locale';

class DatePickerCustom extends Component {
	viDatePicker = () => {
		const day = 'CN_T2_T3_T4_T5_T6_T7'.split('_');
		const months = 'Th-1_Th-2_Th-3_Th-4_Th-5_Th-6_Th-7_Th-8_Th-9_Th-10_Th-11_Th-12'.split('_');

		return {
			localize: {
				day: (n) => day[n],
				month: (n) => months[n],
			},
			formatLong: {
				date: () => (this.props.language === constVals.LANGUAGES.EN ? 'MM/dd/yyyy' : 'dd/MM/yyyy'),
			},
		};
	};

	dateOnchange = (date) => {
		this.props.getDatePicker(date);
	};

	renderPickerDate = () => {
		const { VI } = constVals.LANGUAGES;
		const viDatePicker = this.viDatePicker();
		const { startDate, minDate, maxDate, language } = this.props;

		const customProps = {
			minDate: minDate ? new Date() : null,
			maxDate: maxDate ? new Date() : null,
		};

		return (
			<DatePicker
				{...customProps}
				selected={startDate}
				onChange={this.dateOnchange}
				dateFormat={viDatePicker && viDatePicker.formatLong.date()}
				locale={language === VI ? { ...vi, ...viDatePicker } : null}
			/>
		);
	};

	render() {
		return <div className='customize-datePicker'>{this.renderPickerDate()}</div>;
	}
}
const mapStateToProps = ({ appReducer }) => ({
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DatePickerCustom);
