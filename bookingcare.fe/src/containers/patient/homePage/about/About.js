import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';

class About extends Component {
 renderAboutImg = () => {
  const list = [
   [
    {
     href:
      'https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm',
     nameClass: 'About-pic1',
     style: {
      width: '162px',
      backgroundSize: '142px 30px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/suckhoedoisong.png')})`,
     },
    },
    {
     href: 'https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm',
     nameClass: 'About-pic2',
     style: {
      width: '106px',
      backgroundSize: '86px 30px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/vtv1.png')})`,
     },
    },
    {
     href: 'https://ictnews.vietnamnet.vn/',
     nameClass: 'About-pic3',
     style: {
      width: '127px',
      backgroundSize: '107px 30px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/ictnews.png')})`,
     },
    },
   ],

   [
    {
     href: 'https://vnexpress.net/thi-diem-dat-lich-kham-chua-benh-truc-tuyen-4267383.html',
     nameClass: 'About-pic4',
     style: {
      width: '183px',
      backgroundSize: '163px 30px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/vnexpress.png')})`,
     },
    },
    {
     href:
      'https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm',
     nameClass: 'About-pic8',
     style: {
      width: '151px',
      backgroundSize: '131px 30px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/vtcnews.png')})`,
      backgroundColor: '#a3171e',
      borderRadius: '5px',
     },
    },
    {
     href:
      'https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm',
     nameClass: 'About-pic5',
     style: {
      width: '127px',
      backgroundSize: '107px 40px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/cuc-cong-nghe-thong-tin-bo-y-te-2.png')})`,
     },
    },
   ],

   [
    {
     href:
      'https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm',
     nameClass: 'About-pic6',
     style: {
      width: '129px',
      backgroundSize: '109px 30px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/infonet.png')})`,
     },
    },
    {
     href: 'https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm',
     nameClass: 'About-pic2',
     style: {
      width: '106px',
      backgroundSize: '86px 30px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/vtv1.png')})`,
     },
    },
    {
     href:
      'https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm',
     nameClass: 'About-pic7',
     style: {
      width: '96px',
      backgroundSize: '76px 25px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/vtcgo.png')})`,
      backgroundColor: '#16325c',
      borderRadius: '5px',
     },
    },
    {
     href: 'https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm',
     nameClass: 'About-pic2',
     style: {
      width: '106px',
      backgroundSize: '86px 30px',
      backgroundImage: `url(${require('../../../../assets/images/logosMedia/vtv1.png')})`,
     },
    },
   ],
  ];

  const tempList = list.map((group, groupIdx) => {
   return (
    <div key={groupIdx}>
     {group.map((item, idx) => {
      return (
       <a
        key={idx}
        href={item.href}
        className={`imgBgr`}
        style={{
         ...item.style,
        }}
       >
        {}
       </a>
      );
     })}
    </div>
   );
  });

  return tempList;
 };

 render() {
  const title = 'Truyền thông nói về Booking care';

  return (
   <div className='About-content'>
    <div className='section-content container'>
     <div className='section-title'>{title}</div>
     <div className='section-info'>
      <div className='About-left'>
       <iframe
        width='100%'
        height='410px'
        src='https://www.youtube.com/embed/FyDQljKtWnI'
        title='CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
       ></iframe>
      </div>
      <div className='About-right'>{this.renderAboutImg()}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
