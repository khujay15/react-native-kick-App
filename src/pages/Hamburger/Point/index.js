import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import Coupon from './Coupon';
import PointPage from './PointPage';
import MyPoint from './MyPoint';

import { Iamport } from './IAMPORT/Iamport';
import { IamportResult } from './IAMPORT/IamportResult';

export const StackNavigator = createBottomTabNavigator(
  {
    mypoint: { screen: MyPoint },
    pointpage: { screen: PointPage },
    coupon: { screen: Coupon },
    Iamport: { screen: Iamport },
    IamportResult: { screen: IamportResult },
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
  },
);

export default createAppContainer(StackNavigator);
