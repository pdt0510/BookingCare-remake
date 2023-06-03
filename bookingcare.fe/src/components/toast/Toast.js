import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ToastComp extends Component {
 render() {
  return (
   <ToastContainer
    position='top-right'
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme='light'
   />
  );
 }
}

export default ToastComp;
