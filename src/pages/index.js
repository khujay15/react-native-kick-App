import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import SamplePage from 'pages/Sample';
import WelcomeScreenContainer from 'pages/Login';
import EmailLogin from 'pages/Login/EmailLogin';
import AuthPhone from 'pages/Login/AuthPhone';
import PrivacyTerms from 'pages/Login/AuthPhone/Terms/PrivacyTerms';
import ServiceTerms from 'pages/Login/AuthPhone/Terms/ServiceTerms';

import SignUp from 'pages/Login/SignUp';
import { authtest } from '/pages/Login/authtest';

const WelcomeStackNavigator = createStackNavigator(
  {
    login: WelcomeScreenContainer,
    emaillogin: EmailLogin,
    authphone: AuthPhone,
    signup: SignUp,
    service: ServiceTerms,
    privacy: PrivacyTerms,
  },
  {
    headerMode: 'none',
  },
);

const BaseRouter = createSwitchNavigator(
  {
    sample: SamplePage,
    login: WelcomeStackNavigator,
  },
  {
    initialRouteName: 'login',
  },
);

export default createAppContainer(BaseRouter);
