import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './containers/App';
import { Provider } from 'react-redux';
import configureReduxStore from './reduxStore';
import TranslationHoc from './hoc/TranslationHoc';
import { BrowserRouter } from 'react-router-dom';

const { reduxStore, persistor } = configureReduxStore();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 <Provider store={reduxStore}>
  <TranslationHoc>
   <BrowserRouter>
    <App persistor={persistor} />
   </BrowserRouter>
  </TranslationHoc>
 </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
