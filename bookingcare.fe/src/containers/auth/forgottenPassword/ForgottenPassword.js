import React, { Component } from 'react';
import EmailModal from './forgottenModal/ForgottenModal';

class ForgottenPassword extends Component {
 state = {
  open: false,
 };

 render() {
  return (
   <div className='forgottenPassword-content'>
    <EmailModal />
   </div>
  );
 }
}

export default ForgottenPassword;
