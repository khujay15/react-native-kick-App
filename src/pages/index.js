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
import Coupon from 'pages/Coupon';
import DrawerContainer from 'pages/DrawPage';
import MapPage from 'pages/MapPage';
import Payment from 'pages/Payment';

import License from 'pages/License';
import Tutorial from 'pages/Tutorial';
import { authtest } from '/pages/Login/authtest';
import FindPassword from 'pages/FindPassword';
import SmartKey from 'pages/SmartKey';

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
    coupon: { screen: Coupon },
  },
  {
    contentComponent: DrawerContainer,
  },
);

const BaseRouter = createSwitchNavigator(
  {
    map: MapDrawerNavigator,
    login: WelcomeStackNavigator,
    tutorial: Tutorial,
    payment: Payment,
    FindPassword,
    license: License,
    SmartKey,
  },
  {
    initialRouteName: 'map',
  },
);

export default createAppContainer(BaseRouter);
