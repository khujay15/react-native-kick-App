# 잡다한 정리

## components

- DefaultArrowPage

<img src="https://github.com/khujay15/react-native-kick-App/blob/master/docs/etc/defaultArrowPageDesc.png" width="30%" height="30%"/>  

- Splash
> 파일 저장 라이브러리는 [react-native-sensitive-info](https://github.com/mCodex/react-native-sensitive-info)를 사용함.

- 구글 로그인은 [react-native-google-signin](https://github.com/react-native-community/react-native-google-signin)을 사용함. 

- 카카오 로그인은 [react-native-kakao-logins](https://github.com/react-native-seoul/react-native-kakao-logins)을 사용.
> 카카오 디벨로퍼 페이지에서 앱키를 입력할 때, 아래 코드를 MainApplication에 넣고 실행해서 나온 값을 적거나,
```java

  private void getHashKey(){
    PackageInfo packageInfo = null;
    try {
      packageInfo = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }
    if (packageInfo == null)
      Log.e("KeyHash", "KeyHash:null");

    for (Signature signature : packageInfo.signatures) {
      try {
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        Log.d("KeyHash", Base64.encodeToString(md.digest(), Base64.DEFAULT));
      } catch (NoSuchAlgorithmException e) {
        Log.e("KeyHash", "Unable to get MessageDigest. signature=" + signature, e);
      }
    }
  }
```
> 혹은 SigningReport를 실행 후, __echo <SHA-1 값> | xxd -r -p | openssl base64__ 을 터미널에 쳐서 나온 값을 등록하도록 한다.

- ShadowBox
> 안드로이드에서 그림자 표현은 ios처럼 자유롭지 못하다.   
elevation으로 간단하게 조절하는 게 다인데, 그림자의 방향을 설정 하고 싶으면 뷰를 겹쳐서 그림자 방향의 반대방향으로 마진을 넣자.   
나는 하다 못해 [react-native-shadow](https://github.com/879479119/react-native-shadow)를 다운로드 했는데, 그림자를 dp단위로 그리는 방법이었다. 비추천한다

- UsageHistory, PointHistory
> 5개씩 Pagenation된 서버에 FlatList를 통해서 스크롤을 내릴 때마다 요청하도록 설정했다. 

- SafeAreaMaterialTopTabBar
> react-navigation에서 사용하는 MaterialTopBar 컴포넌트에서 [애니메이션 이슈](https://github.com/react-navigation/tabs/issues/102)가 있어서
**animationEnabled**와 **swipeEnabled**을 false로 설정했다. 



