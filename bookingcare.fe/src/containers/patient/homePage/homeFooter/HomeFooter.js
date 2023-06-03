import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';

class HomeFooter extends Component {
 renderMidLink = () => {
  const linkList = [
   {
    href: 'https://bookingcare.vn/hop-tac-voi-bookingcare',
    title: ' Liên hệ hợp tác',
   },
   {
    href: 'https://bookingcare.vn/goi-chuyen-doi-so',
    title: 'Gói chuyển đổi số doanh nghiệp',
   },
   {
    href: 'https://bookingcare.vn/tuyen-dung',
    title: 'Tuyển dụng',
   },
   {
    href: 'https://bookingcare.vn/hop-tac-voi-bookingcare',
    title: ' Liên hệ hợp tác',
   },
   {
    href: 'https://bookingcare.vn/goi-chuyen-doi-so',
    title: 'Gói chuyển đổi số doanh nghiệp',
   },
   {
    href: 'https://bookingcare.vn/tuyen-dung',
    title: 'Tuyển dụng',
   },
   {
    href: 'https://bookingcare.vn/hop-tac-voi-bookingcare',
    title: ' Liên hệ hợp tác',
   },
   {
    href: 'https://bookingcare.vn/goi-chuyen-doi-so',
    title: 'Gói chuyển đổi số doanh nghiệp',
   },
   {
    href: 'https://bookingcare.vn/tuyen-dung',
    title: 'Tuyển dụng',
   },
  ];

  const tempList = linkList.map((item, idx) => {
   return (
    <a
     key={idx}
     href={item.href}
     className='HomeFooter-mid-link'
    >
     {item.title}
    </a>
   );
  });

  return tempList;
 };

 renderAppLink = () => {
  const linkList = [
   {
    href: 'https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare',
    title: 'Android',
   },
   {
    href: 'https://apps.apple.com/vn/app/bookingcare/id1347700144',
    title: 'Iphone/iPad',
   },
   {
    href: 'https://bookingcare.vn/app',
    title: 'Khác',
    noDash: true,
   },
   {
    href: '##',
    title: (
     <>
      <br />© 2022 BookingCare.
     </>
    ),
    noDash: true,
   },
  ];

  const tempList = linkList.map((item, idx) => {
   return (
    <span key={idx}>
     {item.noDash ? '' : ' '}
     <a
      href={item.href}
      className='HomeFooter-mid-link'
     >
      {item.title}
     </a>
     {item.noDash ? '' : ' - '}
    </span>
   );
  });

  return tempList;
 };

 render() {
  return (
   <div className='HomeFooter-content'>
    <div className='section-content container'>
     <div className='section-info'>
      <div className='HomeFooter-left'>
       <div className='HomeFooter-left-icon'></div>
       <div className='HomeFooter-left-text'>
        <div className='left-text-company'>Công ty Cổ phần Công nghệ BookingCare</div>
        <div className='left-text-address'>
         <i className='fas fa-map-marker-alt text-address-icon'></i>
         28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
        </div>
        <div className='left-text-created'>
         <i className='fas fa-check left-created-icon'></i>
         ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
        </div>
       </div>
       <div className='HomeFooter-left-label'></div>
      </div>
      <div className='HomeFooter-mid'>{this.renderMidLink()}</div>
      <div className='HomeFooter-right'>
       <div className='HomeFooter-right-text'>
        <div className='right-text-title'>Trụ sở tại Hà Nội</div>
        <div className='right-text-address'>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>
       </div>
       <div className='HomeFooter-right-text'>
        <div className='right-text-title'>Văn phòng tại TP Hồ Chí Minh</div>
        <div className='right-text-address'>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>
       </div>
       <div className='HomeFooter-right-text'>
        <div className='right-text-title'>Hỗ trợ khách hàng</div>
        <div className='right-text-address'>support@bookingcare.vn (7h - 18h)</div>
       </div>
      </div>
     </div>
     <hr />
     <div className='HomeFooter-app'>
      <i className='fas fa-mobile-alt HomeFooter-app-icon'></i>
      Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:
      {this.renderAppLink()}
     </div>
    </div>
   </div>
  );
 }
}

const mapStateToProps = (state) => {
 return {};
};

const mapDispatchToProps = (dispatch) => {
 return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
