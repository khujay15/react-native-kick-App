import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import Coupon from './Coupon';
import PointPage from './PointPage';
import Point from './Point';

export const StackNavigator = createBottomTabNavigator(
  {
    mypoint: { screen: Point },
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
