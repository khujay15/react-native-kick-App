import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createMaterialTopTabNavigator
  } from 'react-navigation';
  import Splash from 'components/splash';
  import SafeAreaMaterialTopTabBar from 'components/modules/SafeAreaMaterialTopTabBar';
  import { HamburgerIcon, MainIcon, InfoIcon } from 'components/modules/SafeAreaMaterialTopTabBar/TopBarIcon/TopBarIcon';
  
  //Login
  import WelcomeScreen from 'pages/Login';
  import AuthEmail from 'pages/Login/AuthEmail';
  import EmailLogin from 'pages/Login/EmailLogin';
  import AuthPhone from 'pages/Login/AuthPhone';
  import AuthPhoneInput from 'pages/Login/AuthPhone/AuthPhoneInput';
  import SignUp from 'pages/Login/SignUp';
  import Tutorial from 'pages/Login/Tutorial';

  //Hamburger
  import DrawPage from 'pages/Hamburger';
  import PointNavigator from 'pages/Hamburger/Point';
  import Setting from 'pages/Hamburger/Setting';
  import UsageHistory from 'pages/Hamburger/UsageHistory';
  import MyCard from 'pages/Hamburger/MyCard';
  import NewCard from 'pages/Hamburger/MyCard/NewCard';
  import License from 'pages/Hamburger/License';
  
  //MapPage
  import MapPage from 'pages/MapPage/MapPage';
  import LentInput from 'pages/MapPage/LentModal/LentInput';

  //CustomService
  import CustomerService from 'pages/CustomerService/CustomerService';
  import OutOfOrder from 'pages/CustomerService/OutOfOrder';
  import FAQservice from 'pages/CustomerService/FAQservice';

  const LoginStackNavigator = createStackNavigator(
    {
      login: WelcomeScreen,
      emaillogin: EmailLogin,
      authemail: AuthEmail,
      authphone: AuthPhone,
      authphoneinput: AuthPhoneInput,
      signup: SignUp,
      tutorial: Tutorial,
    },
    {
      headerMode: 'none',
    },
  );
  
  export const TopTabNavigatior = createMaterialTopTabNavigator(
    {
      Hamburger: {
        screen: DrawPage,
        navigationOptions: {
          tabBarIcon: HamburgerIcon,
        },
      },
      MapPage: {
        screen: MapPage,
        navigationOptions: {
          tabBarIcon: MainIcon,
        },
      },
      Cservice: {
        screen: CustomerService,
        navigationOptions: {
          tabBarIcon: InfoIcon,
        },
      },
    },
    {
      initialRouteName: 'MapPage',
      animationEnabled: false,
      swipeEnabled: false,
  /* 
  react-native-tab are using react-native-reanimated, which has issue about animations. 
  In this version(0.59), animation will make screen change really slow , even sometimes don't react to tapping.
  check below url: 
  https://github.com/react-navigation/tabs/issues/102
  */
      tabBarComponent: SafeAreaMaterialTopTabBar,
      tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
          backgroundColor: 'white',
            shadowRadius: 3,
            shadowColor: 'rgb(0, 0, 0.7)',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 5 },
            justifyContent: 'center',
        },
      },
    },
  );
  
  const MapStackNavigator = createStackNavigator(
    {
      map: TopTabNavigatior,
      lentinput : {screen : LentInput},

      point: { screen: PointNavigator },
      mycard: { screen: MyCard },
      newcard: {screen: NewCard },
      setting: { screen: Setting },
      usage: { screen: UsageHistory },
      license: {screen: License},

      cservice: { screen: CustomerService },
      outoforder: { screen: OutOfOrder },
      FAQ: { screen: FAQservice },
    },
    {
      headerMode: 'none',
    },
  );
  
  const BaseRouter = createSwitchNavigator(
    {
      splash: Splash,
      login: LoginStackNavigator,
      map: MapStackNavigator,
    },
    {
      initialRouteName: 'splash',
    },
  );
  
  export default createAppContainer(BaseRouter);
  


  
  // TODO:   1. android shadow elevation 2. Firebase Auth  Notificatuin