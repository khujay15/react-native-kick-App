import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SamplePage from 'pages/Sample';
import { WelcomeScreen } from 'pages/Login/WelcomeScreen';

const BaseRouter = createSwitchNavigator(
  {
    login: WelcomeScreen,
    sample: SamplePage,
  },
  {
    initialRouteName: 'login',
  },
);

export default createAppContainer(BaseRouter);
