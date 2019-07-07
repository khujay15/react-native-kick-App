// import {
//   createAppContainer,
//   createSwitchNavigator,
//   createStackNavigator,
//   createDrawerNavigator,
//   MaterialTopTabBar,
//   NavigationActions,
//   createMaterialTopTabNavigator
// } from 'react-navigation';
// import React from 'react';
// import { SafeAreaView, Image, View, Text, Button } from 'react-native';
// import AuthEmail from 'pages/Login/AuthEmail';
// import WelcomeScreenContainer from 'pages/Login';
// import EmailLogin from 'pages/Login/EmailLogin';
// import AuthPhone from 'pages/Login/AuthPhone';
// import AuthPhoneInput from 'pages/Login/AuthPhone/AuthPhoneInput';
// import PrivacyTerms from 'pages/Login/AuthPhone/Terms/PrivacyTerms';
// import ServiceTerms from 'pages/Login/AuthPhone/Terms/ServiceTerms';
// import SignUp from 'pages/Login/SignUp';
// import Point from 'pages/Point';
// import Setting from 'pages/Setting';
// import DrawerContainer from 'pages/DrawPage';
// import MapPage from 'pages/MapPage/';
// import MapPageContainer from 'pages/MapPage/MapPage';
// import Payment from 'pages/Payment';
// import UsageHistory from 'pages/UsageHistory';

// import CustomerService from 'pages/CustomerService/CustomerService';
// import OutOfOrder from 'pages/CustomerService/OutOfOrder';
// import FAQservice from 'pages/CustomerService/FAQservice';

// import License from 'pages/License';
// import Tutorial from 'pages/Tutorial';
// import { authtest } from '/pages/Login/authtest';
// import authtestResult from 'pages/Login/authtestResult';
// import FindPassword from 'pages/FindPassword';
// import SmartKey from 'pages/SmartKey';
// import MyCard from 'pages/MyCard';
// import LentInput from 'pages/MapPage/LentModal/LentInput';
// import Splash from 'components/splash';
// import { color } from 'theme';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// const WelcomeStackNavigator = createStackNavigator(
//   {
//     login: WelcomeScreenContainer,
//     emaillogin: EmailLogin,
//     authemail: AuthEmail,
//     authphone: AuthPhone,
//     authphoneinput: AuthPhoneInput,
//     signup: SignUp,
//     service: ServiceTerms,
//     privacy: PrivacyTerms,
//   },
//   {
//     headerMode: 'none',
//   },
// );

// // export const MapDrawerNavigator = createDrawerNavigator(
// //   {
// //     mappage: { screen: MapPage },
// //     coupon: { screen: Point },
// //     pay: { screen: Payment },
// //     lentinput : {screen : LentInput},
// //     mycard : { screen: MyCard},
// //     setting : { screen : Setting},
// //     usage : {screen: UsageHistory},
// //     cservice : {screen: CustomerService},

// //   },
// //   {
// //     contentComponent: DrawerContainer,
// //   },
// // );

// function SafeAreaMaterialTopTabBar(props) {
//   return (
//     <SafeAreaView style={{ backgroundColor: 'white' }}>
//       <MaterialTopTabBar
//         {...props}
//         indicatorStyle={{ backgroundColor: color.oboon }}
//         style={{
//           backgroundColor: 'white',
//           shadowRadius: 3,
//           shadowColor: 'rgb(0, 0, 0.7)',
//           shadowOpacity: 0.1,
//           shadowOffset: { width: 0, height: 5 },
//           justifyContent: 'center',
//         }}
//       />

//     </SafeAreaView>
//   );
// }

// export const TopTabNavigatior = createMaterialTopTabNavigator(
//   {

//     MapPage: {
//       screen: MapPageContainer,
//       navigationOptions: {
//         tabBarIcon: ({ tintColor, focused }) => (
//           <Image
//             style={{
//               marginHorizontal: 20,
//               width: 63,
//               height: 23,
//               resizeMode: 'contain',
//             }}
//             source={
//               focused
//                 ? require('/assets/icons/ic_logo.png')
//                 : require('/assets/icons/ic_logo.png')
//             }
//           />
//         ),
//       },
//     },

//     DrawerContainer: {
//       screen: DrawerContainer,
//       navigationOptions: {
//         tabBarIcon: ({ tintColor, focused }) => (
//           <View>
//             <View
//               style={{
//                 borderBottomWidth: 2,
//                 width: 12,
//                 marginBottom: 5,
//                 borderBottomColor: focused ? color.oboon : color.grey,
//               }}
//             />
//             <View
//               style={{
//                 borderBottomWidth: 2,
//                 width: 16,
//                 marginBottom: 5,
//                 borderBottomColor: focused ? color.oboon : color.grey,
//               }}
//             />
//             <View
//               style={{
//                 borderBottomWidth: 2,
//                 width: 16,
//                 borderBottomColor: focused ? color.oboon : color.grey,
//               }}
//             />
//           </View>
//         ),
//       },
//     },

//     cservice: {
//       screen: CustomerService,
//       navigationOptions: {
//         tabBarIcon: ({ tintColor, focused }) => (
//           <View
//             style={{
//               width: 22,
//               height: 22,
//               borderRadius: 11,
//               borderWidth: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderColor: focused ? color.oboon : color.grey,
//             }}
//           >
//             <Text style={{ color: focused ? color.oboon : color.grey }}>i</Text>
//           </View>
//         ),
//       },
//     },
//   },
//   {
//     initialRouteName: 'MapPage',
//     animationEnabled: false,
// /*
// react-native-tab are using react-native-reanimated, which has issue about animated.
// In this version(0.59), animated will make screen change really slow , even sometimes don't react to tapping.
// https://github.com/react-navigation/tabs/issues/102

// */
//      tabBarComponent: SafeAreaMaterialTopTabBar,
//     swipeEnabled: false,
//     order: ['DrawerContainer', 'MapPage', 'cservice'],
//     tabBarOptions: {
//       showIcon: true,
//       showLabel: false,
//       style: {
//         backgroundColor: 'white',
//           shadowRadius: 3,
//           shadowColor: 'rgb(0, 0, 0.7)',
//           shadowOpacity: 0.1,
//           shadowOffset: { width: 0, height: 5 },
//           justifyContent: 'center',
//       },
//     },
//   },
// );

// const MapStackNavigator = createStackNavigator(
//   {
//     map: TopTabNavigatior,
//     coupon: { screen: Point },
//     mycard: { screen: MyCard },
//     setting: { screen: Setting },
//     usage: { screen: UsageHistory },
//     cservice: { screen: CustomerService },
//     outoforder: { screen: OutOfOrder },
//     FAQ: { screen: FAQservice },
//   },
//   {
//     headerMode: 'none',
//   },
// );

// const BaseRouter = createSwitchNavigator(
//   {
//     splash: Splash,
//     // mappage: MapPage,
//     map: MapStackNavigator,
//     login: WelcomeStackNavigator,
//     tutorial: Tutorial,
//     payment: Payment,
//     FindPassword,
//     license: License,
//     SmartKey,
//     authtest,
//     authtestResult,
//     authphone: AuthPhone,
//     authemail: AuthEmail,
//     signup: SignUp,
//     coupon: { screen: Point },
//   },
//   {
//     initialRouteName: 'splash',
//   },
// );

// export default createAppContainer(BaseRouter);
export { default } from './Route';
