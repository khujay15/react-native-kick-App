import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import FindID from './FindID';
import FindPassword from './FindPassword';

export const StackNavigator = createBottomTabNavigator(
  {
    ID: { screen: FindID },
    Password: { screen: FindPassword },
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
  },
);

export default createAppContainer(StackNavigator);
