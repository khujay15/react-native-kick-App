import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
    MaterialTopTabBar,
    NavigationActions,
    createMaterialTopTabNavigator
  } from 'react-navigation';
  import React from 'react';
  import { SafeAreaView, Image, View, Text, Button } from 'react-native';
  import AuthEmail from 'pages/Login/AuthEmail';
  import WelcomeScreen from 'pages/Login';
  import EmailLogin from 'pages/Login/EmailLogin';
  import AuthPhone from 'pages/Login/AuthPhone';
  import AuthPhoneInput from 'pages/Login/AuthPhone/AuthPhoneInput';
  import PrivacyTerms from 'pages/Login/AuthPhone/Terms/PrivacyTerms';
  import ServiceTerms from 'pages/Login/AuthPhone/Terms/ServiceTerms';
  import SignUp from 'pages/Login/SignUp';
  import PointNavigator from 'pages/Point';
  import Setting from 'pages/Setting';
  import DrawerNavigator from 'pages/DrawPage';
  import MapPage from 'pages/MapPage/MapPage';
  import LentInput from 'pages/MapPage/LentModal/LentInput';

  import UsageHistory from 'pages/UsageHistory';
  
  import CustomerService from 'pages/CustomerService/CustomerService';
  import OutOfOrder from 'pages/CustomerService/OutOfOrder';
  import FAQservice from 'pages/CustomerService/FAQservice';
  
  import License from 'pages/License';
  import Tutorial from 'pages/Tutorial';

  import MyCard from 'pages/MyCard';
  import NewCard from 'pages/MyCard/NewCard';

  import Splash from 'components/splash';
  import { color } from 'theme';
  import {authtest } from 'pages/Point/IAMPORT/authtest' ;
  import { authtestResult } from 'pages/Point/IAMPORT/authtestResult';
  
  const WelcomeStackNavigator = createStackNavigator(
    {
      login: WelcomeScreen,
      emaillogin: EmailLogin,
      authemail: AuthEmail,
      authphone: AuthPhone,
      authphoneinput: AuthPhoneInput,
      signup: SignUp,
      service: ServiceTerms,
      privacy: PrivacyTerms,

    },
    {
      headerMode: 'none',
    },
  );
  
  function SafeAreaMaterialTopTabBar(props) {
    return (
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <MaterialTopTabBar
          {...props}
          indicatorStyle={{ backgroundColor: color.oboon }}
          style={{
            backgroundColor: 'white',
            shadowRadius: 3,
            shadowColor: 'rgb(0, 0, 0.7)',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 5 },
            justifyContent: 'center',
          }}
        />
     
      </SafeAreaView>
    );
  }
  
  
  
  
  export const TopTabNavigatior = createMaterialTopTabNavigator(
    {
      
      MapPage: {
        screen: MapPage,
        navigationOptions: {
          tabBarIcon: ({ tintColor, focused }) => (
            <Image
              style={{
                marginHorizontal: 20,
                width: 63,
                height: 23,
                resizeMode: 'contain',
              }}
              source={
                focused
                  ? require('/assets/icons/ic_logo.png')
                  : require('/assets/icons/ic_logo.png')
              }
            />
          ),
        },
      },
  
      DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
          tabBarIcon: ({ tintColor, focused }) => (
            <View>
              <View
                style={{
                  borderBottomWidth: 2,
                  width: 12,
                  marginBottom: 5,
                  borderBottomColor: focused ? color.oboon : color.grey,
                }}
              />
              <View
                style={{
                  borderBottomWidth: 2,
                  width: 16,
                  marginBottom: 5,
                  borderBottomColor: focused ? color.oboon : color.grey,
                }}
              />
              <View
                style={{
                  borderBottomWidth: 2,
                  width: 16,
                  borderBottomColor: focused ? color.oboon : color.grey,
                }}
              />
            </View>
          ),
        },
      },
  
      cservice: {
        screen: CustomerService,
        navigationOptions: {
          tabBarIcon: ({ tintColor, focused }) => (
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: focused ? color.oboon : color.grey,
              }}
            >
              <Text style={{ color: focused ? color.oboon : color.grey }}>i</Text>
            </View>
          ),
        },
      },
    },
    {
      initialRouteName: 'MapPage',
      animationEnabled: false,
  /* 
  react-native-tab are using react-native-reanimated, which has issue about animated. 
  In this version(0.59), animated will make screen change really slow , even sometimes don't react to tapping.
  https://github.com/react-navigation/tabs/issues/102
  
  */
      tabBarComponent: SafeAreaMaterialTopTabBar,
      swipeEnabled: false,
      order: ['DrawerNavigator', 'MapPage', 'cservice'],
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
      coupon: { screen: PointNavigator },
      mycard: { screen: MyCard },
      newcard: {screen: NewCard },
      setting: { screen: Setting },
      usage: { screen: UsageHistory },
      lentinput : {screen : LentInput},

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
      login: WelcomeStackNavigator,
      map: MapStackNavigator,
      tutorial: Tutorial,
      license: License,
      authtest: authtest,
      authtestResult: authtestResult

    },
    {
      initialRouteName: 'splash',
    },
  );
  
  export default createAppContainer(BaseRouter);
  

  // 앱버튼 용 네비게이터
  // export const MapDrawerNavigator = createDrawerNavigator(
  //   {
  //     mappage: { screen: MapPage },
  //     coupon: { screen: Point },
  //     pay: { screen: Payment },
  //     lentinput : {screen : LentInput},
  //     mycard : { screen: MyCard},
  //     setting : { screen : Setting},
  //     usage : {screen: UsageHistory},
  //     cservice : {screen: CustomerService},
  
  //   },
  //   {
  //     contentComponent: DrawerNavigator,
  //   },
  // );
  