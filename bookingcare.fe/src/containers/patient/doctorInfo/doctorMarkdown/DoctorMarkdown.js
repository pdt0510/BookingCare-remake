import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorMarkdown.scss';
import * as combinedActions from '../../../../store/actions';
import * as constVals from '../../../../utilities';

class DoctorMarkdown extends Component {
 state = {
  contentHtml: '',
 };

 componentDidMount = async () => {
  const { doctorId, getDoctorMarkdownByIdFn } = this.props;
  let result = await getDoctorMarkdownByIdFn(doctorId);

  if (result && result.errCode === constVals.defaultValues.noErrors) {
   this.setState({
    contentHtml: this.convertStrToPuretHTML(result.record.htmlContent),
   });
  }
 };

 convertStrToPuretHTML = (contentHTML) => {
  if (contentHTML) {
   return <span dangerouslySetInnerHTML={{ __html: contentHTML }} />;
  }
  return <span>No content</span>;
 };

 render() {
  return (
   <div className='doctorMarkdown-content colorBgr'>
    <div className='doctorMarkdown-container container'>
     <div>{this.state.contentHtml}</div>
    </div>
   </div>
  );
 }
}

const mapStateToProps = (state) => {
 const { userReducer } = state;
 return {
  isLoggedIn: userReducer.isLoggedIn,
 };
};

const mapDispatchToProps = (dispatch) => ({
 getDoctorMarkdownByIdFn: (id) => dispatch(combinedActions.getDoctorMarkdownByIdFn(id)),
 toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});
export default connect(mapStateToProps, mapDispatchToProps)(DoctorMarkdown);
