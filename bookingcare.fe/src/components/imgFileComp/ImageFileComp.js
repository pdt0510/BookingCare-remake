import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageFileComp.scss';
import Commons from '../../utilities/Commons';
import * as constVals from '../../utilities';

class ImageFileComp extends Component {
 state = {
  imgUrl: null,
  fileToImgBlobUrl: null,
 };

 componentDidUpdate = (prevProps, prevState) => {
  if (this.props.toggleClear !== prevProps.toggleClear) {
   this.setState({
    imgUrl: null,
    fileToImgBlobUrl: null,
   });
  }
 };

 handleImageUploaded = async (e) => {
  const file = e.target.files[0];
  if (file) {
   const { getImgFile, onlyGetImgName } = this.props;
   getImgFile(file);

   if (onlyGetImgName) {
    this.setState({
     imgUrl: null,
    });
   } else {
    const fileToImgBlobUrl = Commons.convertFileToUrl(file);
    if (fileToImgBlobUrl) {
     this.setState({
      imgUrl: fileToImgBlobUrl,
     });
    }
   }

   e.target.value = null;
  }
 };

 renderImg = (imgUrl) => {
  return (
   <span
    className='preview-image'
    style={{ backgroundImage: `url(${imgUrl})` }}
    onClick={this.previewClick}
   ></span>
  );
 };

 render() {
  const { imgUrl } = this.state;
  const { IMGURL, language } = this.props;
  const imgSrc = IMGURL ? IMGURL : imgUrl;
  const enLang = language === constVals.LANGUAGES.EN;

  return (
   <div className='imageFile-content'>
    <input
     ref='file'
     type='file'
     name='image'
     id='imgFor'
     hidden
     onChange={this.handleImageUploaded}
    />
    <label
     className='imageFile-label-upload'
     htmlFor='imgFor'
     hidden={this.props.hiddenUpload}
    >
     <i className='fas fa-upload'></i> {enLang ? 'Chosoe a img' : 'Chọn ảnh'}
    </label>

    {imgSrc && this.renderImg(imgSrc)}
   </div>
  );
 }
}

const mapStateToProps = ({ appReducer }) => ({
 language: appReducer.language,
});

export default connect(mapStateToProps, null)(ImageFileComp);
