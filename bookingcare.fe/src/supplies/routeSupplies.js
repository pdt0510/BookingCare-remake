import DoctorManager from '../containers/system/doctorManager/DoctorManager';
import { Notfound } from '../containers/patient/homePage/HomePage';
import UserManager from '../containers/system/userManager/UserManager';
import System from '../routes/System';
import HomePage from '../containers/patient/homePage/HomePage';
import Login from '../containers/auth/login/Login';
import * as lang from '../utilities/groupedLangs';
import { Navigate } from 'react-router-dom';
import DoctorInfo from '../containers/patient/doctorInfo/DoctorInfo';
import DoctorSchedule from '../containers/system/doctorSchedule/DoctorSchedule';
import Doctor from '../routes/Doctor';
import VerifyEmail from '../containers/patient/verifyEmail/VerifyEmail';
import SpecialityManager from '../containers/system/speciality/SpecialityManager';
import SpecialityDetail from '../containers/patient/specialityDetail/SpecialityDetail';
import ClinicManager from '../containers/system/clinics/ClinicManager';
import ClinicDetail from '../containers/patient/clinicDetail/ClinicDetail';
import PatientManager from '../containers/system/patientManager/PatientManager';
import LoggedInOk from '../containers/auth/login/LoggedInOk';
import ForgottenPassword from '../containers/auth/forgottenPassword/ForgottenPassword';
import ChangePassword from '../containers/auth/forgottenPassword/ChangePassword';

const { parentMenuLang, subMenuLangs } = lang;
const { userL, clinicL, specialityL, handbookL } = parentMenuLang;

export const paths = Object.freeze({
 main: '/',
 homePage: '/home',
 allPaths: '*',
 notFound: '/not-found',
 system: '/system',
 login: '/login',
 forgottenPassword: '/forgotten-password',
 loggedIn:
  '/loggedIn/accessToken=:accessToken/refreshToken=:refreshToken/sessionToken=:sessionToken/user=:user',
 doctor: '/doctor',
 doctorInfo: '/doctor-info/:id',
 specialityDetail: '/speciality-detail/:id',
 clinicDetail: '/clinic-detail/:id',
 verifyBooking: '/verify-booking/token=:token/doctorId=:doctorId',
 changePassword: '/change-password/token=:token',
});

const linkNames = {
 userManager: 'user-manager',
 doctorManager: 'doctor-manager',
 scheduleManager: 'schedule-manager',
 clinicManager: 'clinic-manager',
 specialityManager: 'speciality-manager',
 handbookManager: 'handbook-manager',
 patientManager: 'patient-manager',
};

const systemLinks = {
 userManagerLink: `${paths.system}/${linkNames.userManager}`,
 doctorManagerLink: `${paths.system}/${linkNames.doctorManager}`,
 scheduleManagerLink: `${paths.system}/${linkNames.scheduleManager}`,
 clinicManagerLink: `${paths.system}/${linkNames.clinicManager}`,
 specialityManagerLink: `${paths.system}/${linkNames.specialityManager}`,
 handbookManagerLink: `${paths.system}/${linkNames.handbookManager}`,
};

const doctorLinks = {
 scheduleManagerLink: `${paths.doctor}/${linkNames.scheduleManager}`,
 patientManagerLink: `${paths.doctor}/${linkNames.patientManager}`,
};

export const defaultRoutesForNav = {
 userManagerRoute: systemLinks.userManagerLink,
 doctorScheduleRoute: doctorLinks.scheduleManagerLink,
 homeRoute: paths.main,
};

export const parentRoutes = [
 {
  path: paths.main,
  element: <HomePage />,
 },
 {
  path: paths.homePage,
  element: (
   <Navigate
    to={paths.main}
    replace={true}
   />
  ),
 },
 {
  path: paths.system,
  element: <System />,
 },
 {
  path: paths.login,
  element: <Login />,
 },
 {
  path: paths.loggedIn,
  element: <LoggedInOk />,
 },
 {
  path: paths.forgottenPassword,
  element: <ForgottenPassword />,
 },
 {
  path: paths.changePassword,
  element: <ChangePassword />,
 },
 {
  path: paths.doctorInfo,
  element: <DoctorInfo />,
 },
 {
  path: paths.doctor,
  element: <Doctor />,
 },
 {
  path: paths.verifyBooking,
  element: <VerifyEmail />,
 },
 {
  path: paths.specialityDetail,
  element: <SpecialityDetail />,
 },
 {
  path: paths.clinicDetail,
  element: <ClinicDetail />,
 },
 {
  path: paths.allPaths,
  element: <Notfound />,
 },
];

export const systemChildRoutes = [
 //users
 {
  path: systemLinks.userManagerLink,
  element: <UserManager />,
 },
 {
  path: systemLinks.doctorManagerLink,
  element: <DoctorManager />,
 },
 {
  // doctor child route for admin in <System
  path: systemLinks.scheduleManagerLink,
  element: <DoctorSchedule isAdmin={true} />,
 },

 //clinic
 {
  path: systemLinks.clinicManagerLink,
  element: <ClinicManager />,
 },

 //speciality
 {
  path: systemLinks.specialityManagerLink,
  element: <SpecialityManager />,
 },

 //handbook
 {
  path: systemLinks.handbookManagerLink,
  // element: <UserManager />,
 },

 //default index route (path)
 {
  index: true,
  element: <UserManager />,
 },
];

//doctor child routes for doctor user in <Doctor
export const doctorChildRoutes = [
 {
  path: doctorLinks.scheduleManagerLink,
  element: <DoctorSchedule />,
 },
 {
  path: doctorLinks.patientManagerLink,
  element: <PatientManager />,
 },
];

export const adminMenu = [
 //system: user
 {
  name: userL,
  subMenu: [
   {
    name: subMenuLangs.userManagerL,
    link: systemLinks.userManagerLink,
   },
   {
    name: subMenuLangs.doctorManagerL,
    link: systemLinks.doctorManagerLink,
   },
   {
    name: subMenuLangs.scheduleManagerL,
    link: systemLinks.scheduleManagerLink, // for UI of admin user
   },
  ],
 },

 //system: speciality
 {
  name: specialityL,
  subMenu: [
   {
    name: subMenuLangs.specialityManagerL,
    link: systemLinks.specialityManagerLink,
   },
  ],
 },

 //system: clinic
 {
  name: clinicL,
  subMenu: [
   {
    name: subMenuLangs.clinicManagerL,
    link: systemLinks.clinicManagerLink,
   },
  ],
 },

 //system: handbook
 {
  name: handbookL,
  subMenu: [
   {
    name: subMenuLangs.handbookManagerL,
    link: systemLinks.handbookManagerLink,
   },
  ],
 },
];

export const doctorMenu = [
 //system: user
 {
  name: userL,
  subMenu: [
   {
    name: subMenuLangs.scheduleManagerL,
    link: doctorLinks.scheduleManagerLink, // for UI of doctor user
   },
   {
    name: subMenuLangs.patientManagerL,
    link: doctorLinks.patientManagerLink,
   },
  ],
 },
];
