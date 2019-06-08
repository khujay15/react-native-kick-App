import { createStackNavigator, createAppContainer } from 'react-navigation';
import OutOfOrder from './OutOfOrder';
import FAQservice from './FAQservice';
import CustomerService from './CustomerService';

export const StackNavigator = createStackNavigator(
  {
    cservice: { screen: CustomerService },
    outoforder: { screen: OutOfOrder },
    FAQ: { screen: FAQservice },
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(StackNavigator);
