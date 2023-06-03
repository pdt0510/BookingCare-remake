import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Banner.scss';
import * as constVals from '../../../../utilities';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';

class Banner extends Component {
 renderBannerDownBlock = () => {
  const numOfItems = 9;
  const tempList = [];
  const { examinationL, specialityL } = constVals.bannerLangs;

  for (let idx = 0; idx < numOfItems; idx++) {
   let obj = (
    <div
     className='banner-down-block'
     key={idx}
    >
     <div className='imgBgr banner-block-img'></div>
     <div className='banner-block-text'>
      <FormattedMessage id={examinationL} /> <br />
      <FormattedMessage id={specialityL} />
     </div>
    </div>
   );
   tempList.push(obj);
  }
  return tempList;
 };

 placeholderMesL = (mesL) => {
  return this.props.intl.formatMessage({ id: mesL });
 };

 render() {
  const { medicalBgr1L, medicalBgr2L, searchL } = constVals.bannerLangs;

  return (
   <div className='banner-content'>
    <div className='posLayer imgBgr banner-brg'>
     <div className='posLayer banner-info'>
      <div className='banner-up'>
       <div className='banner-up-text'>
        ----- FOR STUDYING ----- <br />
        <FormattedMessage id={medicalBgr1L} />
        <br />
        <FormattedMessage id={medicalBgr2L} />
       </div>
       <div className='searchBar banner-up-searchBar'>
        <input
         type='search'
         placeholder={this.placeholderMesL(searchL)}
        />
       </div>
      </div>
      <div className='banner-mid'>
       <span className='imgBgr google-badge'></span>
       <span className='imgBgr apple-badge'></span>
      </div>
      <div className='posLayer banner-down'>
       <div className='banner-down-width'>{this.renderBannerDownBlock()}</div>
      </div>
     </div>
    </div>
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer }) => ({
 language: appReducer.language,
});

const mapDispatchToProps = () => ({});

export default compose(injectIntl, connect(mapStateToProps, mapDispatchToProps))(Banner);
