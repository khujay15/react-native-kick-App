import React from 'react';
import { TextInput, SafeAreaView, Text, View } from 'react-native';
import Arrow from '/components/modules/Arrow';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import NextPageArrow from '/components/modules/NextPageArrow';
import InputBox from 'components/modules/InputBox';
import IMP from 'iamport-react-native';
import {
  PhoneMainView,
  InnerText,
  Line,
  ErrorText,
  UnderView,
  InText,
  SubText,
} from './AuthPhone.styled';

// IMP 모듈을 사용하면, json token error가 뜨는데 이는 실패시 문자를 URL인코딩을 두번해서 보내주기때문. 직접 node_module/.../certificate 에서 index.js 에서
// JSON.parse부분을 빼고 나오는 값을 url 디코딩을 두번하면 에러 메시지가 나옴.
export default class AuthPhone extends React.Component {
  callback = response => {
    console.log(response);
    const { navigation } = this.props;
    navigation.navigate('login');
  };

  authenticate = () => {
    const data = {
      merchant_uid: `mid_${new Date().getTime()}`,
      min_age: '',
    };

    return (
      <IMP.Certification
        userCode="imp49977043" // 가맹점 식별코드
        data={data} // 본인인증 데이터
        callback={this.callback} // 본인인증 종료 후 콜백
        loading={{
          message: '잠시만 기다려주세요...', // 로딩화면 메시지
        }}
      />
    );
  };

  state = {
    IsError: false,
    IsPhoneInput: 'grey',
  };

  handlePhone = TypedText => {
    const regExp = /^[0-9]{9,20}$/;
    if (TypedText.match(regExp) != null) {
      this.setState({
        IsError: false,
      });
    } else {
      this.setState({ IsError: true, IsPhoneInput: color.oboon });
    }
  };

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <Arrow onPress={() => this.props.navigation.goBack()} />
          <ThemeText>전화번호 인증하기</ThemeText>

          <PhoneMainView>
            <SubText> 고객님의 핸드폰 번호를 입력해주세요</SubText>

            <InnerText>휴대폰 번호</InnerText>
            {this.state.IsError ? (
              <ErrorText>
                {' '}
                잘못된 번호 형식입니다.('-'은 제외해주세요)
              </ErrorText>
            ) : null}

            <InputBox
              keyboardType="numeric"
              onChangeText={this.handlePhone}
              autoFocus
            />

            <Line borderBottomColor={this.state.IsPhoneInput} />
          </PhoneMainView>

          <UnderView>
            <InText>다음 버튼을 클릭시, </InText>
            <Text onPress={() => this.props.navigation.navigate('service')}>
              서비스 이용약관
            </Text>
            <InText>과</InText>
            <Text onPress={() => this.props.navigation.navigate('privacy')}>
              개인 정보 이용약관
            </Text>
            <InText>에 동의하게 됩니다.</InText>
          </UnderView>
        </SafeAreaView>
        <NextPageArrow
          onPress={() =>
            !this.state.IsError && this.state.IsPhoneInput == color.oboon
              ? this.props.navigation.navigate('authphoneinput')
              : null
          }
          color={
            !this.state.IsError && this.state.IsPhoneInput == color.oboon
              ? color.oboon
              : 'grey'
          }
        />
      </>
    );
  }
}
