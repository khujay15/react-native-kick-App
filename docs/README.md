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

## 릴리즈 문제

- android 릴리즈용 apk 파일 생성 시, Duplicate resource 문제. node_modules/react-native 에서 react.gradle 수정  
> [react-native 이슈](https://github.com/facebook/react-native/issues/22234#issuecomment-437812451) 참조.  
> iamport의 html_certification.html 을 위해서 raw폴더 또한 함수에 추가해야함.

- android 릴리즈 파일 실행시 MapPage에서 Crash 나는 경우 AndroidManifest.xml에 org.apache.http.legacy 추가  
[react-native-maps 이슈](https://github.com/react-native-community/react-native-maps/issues/2773#issuecomment-478752790) 참조.

- ios xcode에서 archive 시 ios build failed 'Undefined symbols for architecture x86_64' 에러 발생 -> Build Settings 에서 Enable Bitcode를 no로  

- ios xcode에서 no such file or directory: ... libReact.a'에러 발생 시 [이슈](https://github.com/ivpusic/react-native-image-crop-picker/issues/21) 참조  

- ios 릴리즈 용 archive 시 Unsupported Swift Version 에러 -> xcode 업데이트, swift 버전 업, target ios 버전 12 이상, [cocoapod](https://stackoverflow.com/questions/51767789/build-failing-on-ios-generic-device-but-ok-for-simulator) 삭제 후 다시 실행.

- ios DerivedData 관련한 이슈 -> build clean 후 ios폴더에서 pod install 실행 , xcode 왼쪽 Pods아래에 라이브러리들이 추가되는 것 확인 후 다시 실행.  또는 file - workspace setting - derived data : workspace-relative location 설정 변경. 
