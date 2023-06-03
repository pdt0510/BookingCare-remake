import moment from 'moment';
import { dateFormat, LANGUAGES } from './constant';

class Commons {
 static convertFileToUrl(fileObj) {
  return URL.createObjectURL(fileObj);
 }

 static convertFileToBase64(fileObj) {
  return new Promise((resolve, reject) => {
   const reader = new FileReader();
   reader.readAsDataURL(fileObj);
   reader.onload = () => resolve(reader.result);
   reader.onerror = (error) => reject(error);
  });
 }

 static convertBinaryToBase64(binaryObj) {
  return new Buffer.from(binaryObj).toString();
 }

 static convertObjDateTo_DMYstr = (date) => {
  if (date) {
   return moment(date).format(dateFormat.DMY);
  }
  return null;
 };

 static convertObjDateTo_dDMstr = (date) => {
  if (date) {
   return moment(date).format(dateFormat.dDM);
  }
  return null;
 };

 static convertDateToTimestamp = (dateObj) => {
  if (dateObj) {
   const _23hs = 23 * 3600;
   const converted = moment(dateObj, dateFormat.DMY);
   return Date.parse(converted) / 1000 + _23hs;
  }
  return null;
 };

 static convertTimestampTo_dDMstr = (timestamp) => {
  if (timestamp) {
   return moment(timestamp * 1000).format(dateFormat.dDM);
  }
  return null;
 };

 static convertTimestampTo_DMYstr = (timestamp) => {
  if (timestamp) {
   return moment(timestamp * 1000).format(dateFormat.DMY);
  }
  return null;
 };

 static convertHtmlStrToText = (htmlStr) => {
  if (htmlStr) {
   return <span dangerouslySetInnerHTML={{ __html: htmlStr }} />;
  }
  return <span>No content</span>;
 };

 static switchLangLocally = (language) => {
  const { weekdaysVI, weekdaysEN } = dateFormat;
  if (language === LANGUAGES.EN) {
   return moment.updateLocale(LANGUAGES.EN, { weekdays: weekdaysEN });
  } else {
   return moment.updateLocale(LANGUAGES.VI, { weekdays: weekdaysVI });
  }
 };

 static checkEmailRegex = (emailStr) => {
  return new Promise((resolve, reject) => {
   try {
    const regex = /^\w+(\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const isChecked = regex.test(emailStr);
    resolve(isChecked);
   } catch (error) {
    reject(error);
   }
  });
 };

 static checkUsername = (str) => {
  //20 <= chars >= 8, chữ hoa, thường, số
  const regex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  return regex.test(str);
 };

 static checkPasswordRegex = (passwordStr) => {
  return new Promise(async (resolve, reject) => {
   try {
    // >= 8 chars, chữ hoa + thường + số + đặc biệt (! @ ^..)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    resolve(regex.test(passwordStr));
   } catch (error) {
    reject(error);
   }
  });
 };

 static numberRegex = (number) => {
  const regex = /^[0-9]+$/;
  return regex.test(number);
 };
}

export default Commons;
