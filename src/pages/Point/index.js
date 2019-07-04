import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import Coupon from './Coupon';
import PointPage from './PointPage';
import MyPoint from './MyPoint';

export const StackNavigator = createBottomTabNavigator(
  {
    mypoint: { screen: MyPoint },
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
