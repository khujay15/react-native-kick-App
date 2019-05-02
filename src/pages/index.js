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

import sample from 'pages/Sample';
import Tutorial from 'pages/Tutorial';
import { authtest } from '/pages/Login/authtest';

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
    sample: Tutorial,
  },
  {
    initialRouteName: 'login',
  },
);

export default createAppContainer(BaseRouter);
