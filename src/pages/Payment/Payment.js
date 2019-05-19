import React from 'react';
import { Text, View, Platform } from 'react-native';
import Arrow from '/components/modules/Arrow';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import {
  SignUpMainView,
  InnerText,
  SkipText,
  BottomText,
} from './Payment.styled';

export default class Payment extends React.Component {
  state = {
    CardNumber: '',
    CardDate: '',
    Birth: '',
    PasswordTwo: '',
  };

  handleCardNumber = num => {
    this.setState({ CardNumber: num });
  };

  handleCardDate = num => {
    this.setState({ CardDate: num });
  };

  handleBirth = num => {
    this.setState({ Birth: num });
  };

  handlePasswordTwo = num => {
    this.setState({ PasswordTwo: num });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Arrow onPress={() => this.props.navigation.goBack()} />
        <SkipText onPress={() => this.props.navigation.navigate('mappage')}>
          <Text style={{ color: 'rgb(106,106,106)' }}>건너뛰기</Text>
        </SkipText>

        <ThemeText>지불정보 등록</ThemeText>
        <InnerText>사용하실 카드 정보를 입력해주세요</InnerText>
        <SignUpMainView>
          <InputBox
            onChangeText={this.handleCardNumber}
            placeholder="   카드번호를 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            keyboardType="numeric"
            maxLength={16}
          />

          <InputBox
            onChangeText={this.handleCardDate}
            placeholder="   만료일을 입력해주세요 MM / YY"
            placeholderTextColor="rgb(106, 106, 106)"
            keyboardType="numeric"
            maxLength={4}
          />

          <InputBox
            onChangeText={this.handleBirth}
            placeholder="   생년원일 6자리를 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            keyboardType="numeric"
            maxLength={6}
          />

          <InputBox
            onChangeText={this.handlePasswordTwo}
            placeholder="   비밀번호 앞 2자리를 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            keyboardType="numeric"
            maxLength={2}
          />
          <View style={{ marginTop: 20 }}>
            <BottomText>*지불 등록된 카드로 이용요금이 부과됩니다.</BottomText>
          </View>
        </SignUpMainView>

        <FooterClick
          onPress={() => console.log('axios come on')}
          color={
            this.state.CardNumber &&
            this.state.CardDate &&
            this.state.Birth &&
            this.state.PasswordTwo
              ? color.oboon
              : 'grey'
          }
          text="등록하기"
        />
      </View>
    );
  }
}
