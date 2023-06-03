import { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './ClinicDetail.scss';
import { compose } from 'redux';
import * as constVals from '../../../utilities/index';
import Commons from '../../../utilities/Commons';
import * as combinedActions from '../../../store/actions';
import withRouterHOC from '../../../hoc/withRouterHOC';
import HomeHeader from '../homePage/homeHeader/HomeHeader';

class ClinicDetail extends Component {
 state = {
  img: null,
  name: null,
  descText: null,
  initClinicDetail: null,
 };

 componentDidMount = async () => {
  const clinicId = +this.props.router.params.id;

  if (clinicId && typeof clinicId === 'number') {
   const { getClinicByIdFn, language } = this.props;
   const result = await getClinicByIdFn(clinicId);

   if (result.errCode === 0) {
    const enLang = language === constVals.LANGUAGES.EN;
    const { htmlDesc, address, name } = result.records;
    const textContent = Commons.convertHtmlStrToText(htmlDesc);

    this.setState({
     address,
     descText: textContent,
     name: enLang ? name.split('-')[1] : name.split('-')[0],
     initClinicDetail: result.records,
    });
   }
  }
 };

 componentDidUpdate = (prevProps, prevState) => {
  const { initClinicDetail } = this.state;

  if (initClinicDetail) {
   const { language } = this.props;

   if (language !== prevProps.language) {
    const { name } = initClinicDetail;
    const enLang = language === constVals.LANGUAGES.EN;
    this.setState({ name: enLang ? name.split('-')[1] : name.split('-')[0] });
   }
  }
 };

 render() {
  const { name, descText, address } = this.state;

  return (
   <div className='clinicDetail-content'>
    <HomeHeader />
    <div className='clinicDetail-brg imgBgr'></div>
    <div className='clinicDetail-info '>
     <div className='clinicDetail-title'>
      <div className='clinicDetail-name container'>{name}</div>
      <div className='clinicDetail-address container'>
       <i className='fas fa-map-marker-alt clinicDetail-icon' />
       {address}
      </div>
     </div>
     <div className='info-details-brgColor'>
      <div className='info-details container'>{descText}</div>
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
 getClinicByIdFn: (id) => dispatch(combinedActions.getClinicByIdFn(id)),
 toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(ClinicDetail);
