import nodemailer from 'nodemailer';
import 'dotenv/config';
import * as constVals from '../utilities';

export const sendEmailWithAttachment = async (emailData) => {
 return new Promise(async (resolve, reject) => {
  try {
   const transporter = nodemailer.createTransport(smtpConfig);
   let result = false;
   if (transporter) {
    const { clientEmail, clientSubject, htmlText, attachments } = emailData;
    const webSite = 'Bookingcare.vn';

    const { accepted } = await transporter.sendMail({
     from: `<${process.env.EMAIL_FOR_RESPONSE}> - ${webSite} `,
     to: [clientEmail],
     subject: `${clientSubject} ✔`,
     attachments: attachments,
     html: htmlText,
    });

    result = accepted && accepted.length > 0;
   }
   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const sendEmailInfo = async (emailData, isResetPassword = false) => {
 const transporter = nodemailer.createTransport(smtpConfig);

 if (transporter) {
  const { clientEmail, emailInfo } = emailData;
  let htmlText = null;
  const webSite = 'Bookingcare.vn';
  const clientSubject = 'Comfirm your booking';

  if (isResetPassword) htmlText = getEmailContentForPassword(emailInfo);
  else htmlText = getEmailContentForBooking(emailInfo);

  return await transporter.sendMail({
   from: `${webSite} <${process.env.EMAIL_FOR_RESPONSE}>`,
   to: clientEmail,
   subject: `${clientSubject} ✔`,
   html: htmlText,
  });
 }
 return false;
};

const smtpConfig = {
 host: 'smtp.gmail.com',
 port: 465,
 secure: true,
 auth: {
  user: process.env.EMAIL_FOR_RESPONSE,
  pass: process.env.EMAIL_APP_PASSWORD,
 },
};

const getEmailContentForBooking = (emailInfo) => {
 let htmlText = null;
 const { enlang, fullname, doctorPrice, bookedTime, bookedDate, doctorName, redirectLink } =
  emailInfo;

 if (enlang === constVals.LANGUAGES.EN) {
  htmlText = `You received this email because you booked an online medical appointment on the Bookingcare.vn website.
    <h3>Hi! ${fullname}.</h3>
    <h3>Medical examination time: ${bookedTime}, ${bookedDate}</h3>
    <h3>Price: ${doctorPrice}</h3>
    <h3>Doctor: ${doctorName}</h3>
    If the above information is true, please click on the link below to confirm and complete the medical appointment, thank you.
    <h3>
      <a href=${redirectLink} target='_blank'>Click here</a>
    </h3>`;
 } else {
  htmlText = `
    Bạn nhân được email này vì đã đặt lịch khám bệnh online trên Bookingcare.vn website.
    <h3>Xin chào! ${fullname}.</h3>    
    <h3>Thời gian khám bệnh: ${bookedTime}, ${bookedDate}</h3>
    <h3>Giá khám: ${doctorPrice}</h3>
    <h3>Bác sĩ: ${doctorName}</h3>
    Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ đặt lịch khám bệnh, xin chân thành cảm ơn.
    <h3>
      <a href=${redirectLink} target='_blank'>Nhấn vào đây</a>
    </h3>`;
 }

 return htmlText;
};

const getEmailContentForPassword = (emailInfo) => {
 let htmlText = null;
 const { clientEmail, enlang, resetPasswordToken, timeLimited } = emailInfo;
 const redirectLink = `${process.env.RESET_PASSWORD_REDIRECT_URL}=${resetPasswordToken}`;

 if (enlang) {
  htmlText = `<h3>Hi! ${clientEmail}.</h3>
  Your a reset password on the Bookingcare.vn website. Note, available link is about ${timeLimited}s
  <h3><a href=${redirectLink} target='_blank'>Click here. </a></h3>
  `;
 } else {
  htmlText = `<h3>Xin chào! ${clientEmail}.</h3>
  Tạo mới mật khẩu trong Bookingcare.vn. Lưu ý, link chỉ có giá trị trong ${timeLimited}s
  <h3><a href=${redirectLink} target='_blank'>Nhấn vào đây</a></h3>`;
 }

 return htmlText;
};
