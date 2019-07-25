# Oboon Client

![Alt Text](https://github.com/khujay15/react-native-kick-App/blob/master/docs/MAIN_PROCESS.gif) ![Alt Text](https://github.com/khujay15/react-native-kick-App/blob/master/docs/Android_MAIN_PROCESS.gif)

정문에서 오분이면 충분하죠!

## 프로젝트 세팅

1. `<your-directory>$ git clone https://github.com/khujay15/oboon.git`
2. `<your-directory>$ cd oboon`
3. `oboon$ npm install`
4. `oboon$ cd ios` & `oboon/ios$ pod install`

## 설정된 내용(자세한 설명은 docs폴더를 참조)

### 자주 사용해야 하는 패키지 설치

package.json

```json
{
  ...
  "axios": "^0.18.0",
  "moment": "^2.24.0",
  "react-native-maps": "^0.23.0", // API 키 변경
  "react-navigation": "^3.7.1",
  "react-redux": "^7.0.1",
  "redux": "^4.0.1",
  "styled-components": "^4.2.0",
  "iamport-react-native": "^1.0.6",
  "react-native-google-signin": "^1.2.2",
  "react-native-image-picker": "^0.28.1",
  "react-native-kakao-logins": "^1.3.6",
  "react-native-geolocation-service": "^2.0.0",
  "react-native-gesture-handler": "^1.1.0",
  ...
}
```

### 절대 경로 적용

'src' 디렉토리 하위에 있는 폴더를 기준으로 타고 들어감

- 장점
  - 코드가 깔끔해지고 경로를 알아보기 쉬워짐
  - 파일을 다른 디렉토리로 옮기더라도 import한 파일들의 경로가 깨지지 않음

```javascript
/* 상대 경로 */
import TextInput from '../../components/modules/TextInput';

/* 절대 경로 */
import TextInput from 'components/modules/TextInput';
```

### eslint 및 prettier 적용

airbnb를 기준으로 몇 가지 커스텀 작업을 하였음.

설정법 및 Extension 세팅은 [Velopert Blog](https://velog.io/@velopert/eslint-and-prettier-in-react) 참고

> VSCode 사용시 다음 익스텐션 반드시 설치

- [ESLint](https://marketplace.visualstudio.com/itemdetails?itemName=dbaeumer.vscode-eslint)

- [Prettier](https://marketplace.visualstudio.com/itemdetails?itemName=esbenp.prettier-vscode)

### Cocoapod 인스톨 (ios 외부 패키지 관리 툴)

XCode를 직접 들어가고 싶으면, 'OboonClient.xcodeproj'파일 대신 'OboonClient.xcworkspace'로 들어가야함.

XCode 실행방법

- `~$ open ios/OboonClient.xcworkspace`

### .gitignore 파일 세팅

build 결과물 형태의 모든 파일들은 .gitignore에 추가되어야함.

### iOS, android 패키지명 세팅

| Platform | Package Name             |
| -------- | ------------------------ |
| iOS      | com.oboon.client.ios     |
| android  | com.oboon.client.android |

## 협업 방법

### Git-flow 사용

> 자세한 설명은 [우아한 기술 블로그](http://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html) 참고

### Commit message

- 개발 커밋

  - 앞에는 키워드, 뒤에는 추가하고자 하는 메세지 작성
    ex. `git commit -m "Devleop {{ keyword }}, {{ message }}"`

  - 한 커밋에는 여러 개발이 함께 섞여있으면 안됨

  - 만약, 여러 커밋에 걸쳐 동일한 작업을 진행했다면 반드시 `git rebase`로 커밋 합칠 것

- 버그 수정

  - 이슈가 되었던 커밋 번호를 함께 붙여 커밋
    ex. `git commit -m "Fix 19add6f8, {{ message }}"`

## 프로젝트 버전관리

### 시작점 : 0.0.1

### 업데이트 기준

- develop 브랜치에 하나씩 merge 할 때마다 0.0.1 추가
- master 브랜치에 하나씩 merge 할 때마다 0.1 추가
- 팀 내 회의를 통해 1 추가

### Github Tag 관리

- master 브랜치에 하나씩 merge 할 때마다 0.1씩 추가
- 팀 내 회의를 통해 1 추가
