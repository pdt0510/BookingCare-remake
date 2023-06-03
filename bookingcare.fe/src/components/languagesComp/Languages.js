import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Languages.scss';
import { LANGUAGES } from '../../utilities/constant';
import * as combinedActions from '../../store/actions';

class Languages extends Component {
 switchLang = () => {
  this.props.switchLanguage();
 };

 render() {
  const { language, hideLangsWord } = this.props;
  const { EN, VI } = LANGUAGES;

  return (
   <div
    className='languages-content'
    onClick={this.switchLang}
   >
    {hideLangsWord ? '' : 'Langs: '}
    {language === EN ? EN.toUpperCase() : VI.toUpperCase()}
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer }) => ({
 language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
 switchLanguage: () => dispatch(combinedActions.switchLanguage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
