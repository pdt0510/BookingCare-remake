import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './LoadingGif.scss';

class LoadingGif extends Component {
 render() {
  return (
   <div className='loadingGif-content'>
    <div className='imgBgr loadingGif-img'></div>
   </div>
  );
 }
}

export default LoadingGif;
