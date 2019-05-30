import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import AuthEmail from 'pages/Login/AuthEmail';
import WelcomeScreenContainer from 'pages/Login';
import EmailLogin from 'pages/Login/EmailLogin';
import AuthPhone from 'pages/Login/AuthPhone';
import AuthPhoneInput from 'pages/Login/AuthPhone/AuthPhoneInput';
import PrivacyTerms from 'pages/Login/AuthPhone/Terms/PrivacyTerms';
import ServiceTerms from 'pages/Login/AuthPhone/Terms/ServiceTerms';
import SignUp from 'pages/Login/SignUp';
import Point from 'pages/Point';
import Setting from 'pages/Setting';
import DrawerContainer from 'pages/DrawPage';
import MapPage from 'pages/MapPage';
import Payment from 'pages/Payment';

import License from 'pages/License';
import Tutorial from 'pages/Tutorial';
import { authtest } from '/pages/Login/authtest';
import authtestResult from 'pages/Login/authtestResult';
import FindPassword from 'pages/FindPassword';
import SmartKey from 'pages/SmartKey';
import MyCard from 'pages/MyCard';
import LentInput from 'pages/MapPage/LentModal/LentInput';
import Splash from 'components/splash';

const WelcomeStackNavigator = createStackNavigator(
  {
    
    login: WelcomeScreenContainer,
    emaillogin: EmailLogin,
    authemail: AuthEmail,
    authphone: AuthPhone,
    authphoneinput: AuthPhoneInput,
    signup: SignUp,
    service: ServiceTerms,
    privacy: PrivacyTerms,
  },
  {
    headerMode: 'none',
  },
);

export const MapDrawerNavigator = createDrawerNavigator(
  {
    mappage: { screen: MapPage },
    coupon: { screen: Point },
    pay: { screen: Payment },
    lentinput : {screen : LentInput},
    mycard : { screen: MyCard},
    setting : { screen : Setting},
    
    
  },
  {
    contentComponent: DrawerContainer,
  },
);

const BaseRouter = createSwitchNavigator(
  {
    splash:Splash,
    map: MapDrawerNavigator,
    login: WelcomeStackNavigator,
    tutorial: Tutorial,
    payment: Payment,
    FindPassword,
    license: License,
    SmartKey,
    authtest,
    authtestResult,
    authphone: AuthPhone,
    authemail: AuthEmail,

  },
  {
    initialRouteName: 'splash',
  },
);

export default createAppContainer(BaseRouter);
