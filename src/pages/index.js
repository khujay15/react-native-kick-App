import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import SamplePage from 'pages/Sample';
import WelcomeScreenContainer from 'pages/Login';
import { EmailLogin } from 'pages/Login/EmailLogin';
import { AuthPhone } from '/pages/Login/AuthPhone';

const WelcomeStackNavigator = createStackNavigator(
  {
    login: WelcomeScreenContainer,
    emailLogin: EmailLogin,
    authphone: AuthPhone,
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
