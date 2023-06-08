import { Component } from 'react';
import { connect } from 'react-redux';
import './SpecialityDetail.scss';
import HomeHeader from '../homePage/homeHeader/HomeHeader';
import { compose } from 'redux';
import withRouterHOC from '../../../hoc/withRouterHOC';
import * as combinedActions from '../../../store/actions';
import * as constVals from '../../../utilities/index';
import Commons from '../../../utilities/Commons';
import DoctorInfo from '../doctorInfo/DoctorInfo';

class SpecialityDetail extends Component {
	state = {
		image: null,
		htmlDesc: null,
		doctorList: [],
		seeMore: false,
		provinceId: 'ALL',
	};

	componentDidMount = async () => {
		const { getSpecialityAndDoctorByIdFn, router } = this.props;
		const { id } = router.params;
		if (typeof +id === constVals.typeKeyValue.numType) {
			await getSpecialityAndDoctorByIdFn(id);
		}
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { specialityAndDoctorsListById } = this.props;
		const { doctorList, image, htmlDesc } = this.state;

		if (!image && !htmlDesc && doctorList.length === 0 && specialityAndDoctorsListById.length > 0) {
			const objResult = this.filterAllToState(specialityAndDoctorsListById);
			const doctorList = this.getSpecialityDoctorsById(objResult.doctorIdList);

			this.setState({
				doctorList,
				image: objResult.image,
				htmlDesc: objResult.htmlDesc,
			});
		}
	};

	filterAllToState = (list) => {
		let image = null;
		let htmlDesc = null;
		let doctorIdList = [];

		const length = list.length;
		for (let idx = 0; idx < length; idx++) {
			const { doctorInfoData } = list[idx];

			doctorIdList.push(doctorInfoData);
			if (image === null) {
				image =
					typeof image === constVals.typeKeyValue.bufferType
						? Commons.convertBinaryToBase64(list[idx].image)
						: image;
			}
			if (htmlDesc === null) {
				htmlDesc = list[idx].htmlDesc;
			}
		}

		return {
			image,
			htmlDesc,
			doctorIdList,
		};
	};

	getSpecialityDoctorsById = (list) => {
		return list.map((item, idx) => {
			return {
				doctorInfo: (
					<DoctorInfo
						key={idx}
						DOCTORID={item.doctorId}
					/>
				),
				province: item.provinceVal,
			};
		});
	};

	renderHtmlString = (htmlStr) => {
		return <span dangerouslySetInnerHTML={{ __html: htmlStr }} />;
	};

	showSeeMore = () => {
		this.setState({
			seeMore: !this.state.seeMore,
		});
	};

	renderDoctorInfo = (list) => {
		const { provinceId } = this.state;

		return list.map((item) => {
			const { doctorInfo, province } = item;
			const { id } = province;

			if (provinceId !== 'ALL') {
				if (+provinceId === id) return doctorInfo;
			} else return doctorInfo;
		});
	};

	renderPROSelect = (list) => {
		const optList = [];
		const uniqueList = [];
		const length = list.length;
		const enLang = this.props.language === constVals.LANGUAGES.EN;

		for (let idx = 0; idx < length; idx++) {
			const { id, valueEN, valueVI } = list[idx].province;
			if (!uniqueList.includes(id)) {
				const ele = (
					<option
						key={idx}
						value={id}
					>
						{enLang ? valueEN : valueVI}
					</option>
				);
				optList.push(ele);
				uniqueList.push(id);
			}
		}

		const firstOpt = (
			<option
				key='index'
				value='ALL'
			>
				{enLang ? 'ALL' : 'Tất cả'}
			</option>
		);
		optList.unshift(firstOpt);

		return (
			<select
				name='provinceId'
				className='select-input-custom forSelect'
				onChange={this.handleInput}
			>
				{optList}
			</select>
		);
	};

	handleInput = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	renderSeemore = () => {
		const { seeMore, htmlDesc } = this.state;

		return (
			<>
				<div className={`detail-info ${seeMore ? 'seeMore' : ''}`}>
					{htmlDesc && this.renderHtmlString(htmlDesc)}
				</div>
				<span
					className='detail-seeMore-btn'
					onClick={this.showSeeMore}
				>
					{seeMore ? 'Hide less' : 'See more'}
				</span>
			</>
		);
	};

	render() {
		const { doctorList } = this.state;

		return (
			<div className='detailSpeciality-content'>
				<HomeHeader />

				<div className='detailSpeciality-detail container'>
					{this.props.specialityAndDoctorsListById.length === 0 ? (
						<div className='detail-info2'>
							<h1>No data</h1>
						</div>
					) : (
						this.renderSeemore()
					)}
				</div>

				<div className='detailSpeciality-bgrColor'>
					<div className='detailSpeciality-doctors container'>
						<div className='detailSpeciality-province'>{this.renderPROSelect(doctorList)}</div>
						{doctorList && doctorList.length > 0 && this.renderDoctorInfo(doctorList)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ appReducer, adminReducer }) => ({
	specialityAndDoctorsListById: adminReducer.specialityAndDoctorsListById,
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
	getSpecialityAndDoctorByIdFn: (id) => dispatch(combinedActions.getSpecialityAndDoctorByIdFn(id)),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});
export default compose(
	withRouterHOC,
	connect(mapStateToProps, mapDispatchToProps),
)(SpecialityDetail);
