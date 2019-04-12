import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SamplePage from 'pages/Sample';
import WelcomeScreen from 'pages/Login';

const BaseRouter = createSwitchNavigator(
  {
    sample: SamplePage,
    login: WelcomeScreen,
  },
  {
    initialRouteName: 'login',
  },
);

export default createAppContainer(BaseRouter);
