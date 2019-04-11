import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SamplePage from 'pages/Sample';

const BaseRouter = createSwitchNavigator(
  {
    sample: SamplePage,
  },
  {
    initialRouteName: 'sample',
  },
);

export default createAppContainer(BaseRouter);
