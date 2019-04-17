import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import SamplePage from 'pages/Sample';
import WelcomeScreenContainer from 'pages/Login';
import EmailLogin from 'pages/Login/EmailLogin';
import AuthPhone from 'pages/Login/AuthPhone';
import AuthPhoneInput from 'pages/Login/AuthPhone/AuthPhoneInput';
import PrivacyTerms from 'pages/Login/AuthPhone/Terms/PrivacyTerms';
import ServiceTerms from 'pages/Login/AuthPhone/Terms/ServiceTerms';
import SignUp from 'pages/Login/SignUp';

import MapPage from 'pages/MapPage';
import { authtest } from '/pages/Login/authtest';

const WelcomeStackNavigator = createStackNavigator(
  {
    login: WelcomeScreenContainer,
    emaillogin: EmailLogin,
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

export const MapDrawerNavigator = createDrawerNavigator({
  mappage: { screen: MapPage },
});

const BaseRouter = createSwitchNavigator(
  {
    map: MapDrawerNavigator,
    login: WelcomeStackNavigator,
  },
  {
    initialRouteName: 'login',
  },
);

export default createAppContainer(BaseRouter);
