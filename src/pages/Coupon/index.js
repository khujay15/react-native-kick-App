import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import Coupon from './Coupon';
import PointPage from './PointPage';

export const StackNavigator = createBottomTabNavigator(
  {
    pointpage: { screen: PointPage },
    coupon: { screen: Coupon },
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
  },
);

export default createAppContainer(StackNavigator);
