# Flow Chart

![Alt text](https://github.com/khujay15/react-native-kick-App/blob/master/docs/FlowChart.png)

## Hamburger

### 포인트 

![Alt text](https://github.com/khujay15/react-native-kick-App/blob/master/docs/Hamburger/IAMPORT.gif)

- 결제 관련 -> [iamport 라이브러리](https://github.com/iamport/iamport-react-native) 사용.

- /src/pages/Point/index.js에 BottomTabNavigator로 묶음.

## MapPage

- 각 Modal들의 기능 

![Alt text](https://github.com/khujay15/react-native-kick-App/blob/master/docs/MapPage/MapPageModal.png)

- 지도 관련 -> [react-native-maps](https://github.com/react-native-community/react-native-maps) 
  주의: 안드로이드의 경우 implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"을 build.gradle에 따로 추가해야 빌드가 성공.
  
- GPS 기능 -> [react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service)에서 Geolocation.watchPosition() 사용

- LentReducer와 연결해서 대여시 Action을 발생시켜 state값을 바꾸고 각 컴포넌트에 props형태로 전달.

## cservice

### 신고기능 (OutofOrder.js)

![Alt text](https://github.com/khujay15/react-native-kick-App/blob/master/docs/cservice/REPORT.gif)

- 사진 기능 -> [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker)
