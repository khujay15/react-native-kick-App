import React from 'react';
import { TextInput, SafeAreaView, Text } from 'react-native';
import Arrow from '/components/modules/Arrow';
import { connect } from 'react-redux';
import { PhoneMainView, Line, PhoneText } from './AuthPhoneInput.styled';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import NextPageArrow from '../../../../components/modules/NextPageArrow';
import BottomText from '../../../../components/modules/BottomText';

class AuthPhoneInput extends React.Component {
  state = {
    IsError: false,
    IsPhoneInput: 'grey',
  };

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <Arrow onPress={() => this.props.navigation.goBack()} />
          <ThemeText>전화번호 인증하기</ThemeText>

          <PhoneMainView>
            <PhoneText Phone="01012345678" />

            <TextInput
              keyboardType="numeric"
              onChangeText={this.handlePhone}
              autoFocus
            />

            <Line borderBottomColor={this.state.IsPhoneInput} />
          </PhoneMainView>
        </SafeAreaView>

        <BottomText
          onPress={() => console.log('BottomText clicked')}
          Text="인증번호 재전송"
        />

        <NextPageArrow
          onPress={() =>
            this.props.Tutorial === 'watch'
              ? this.props.navigation.navigate('map')
              : this.props.navigation.navigate('tutorial')
          }
          color={
            !this.state.IsError && this.state.IsPhoneInput === color.oboon
              ? color.oboon
              : 'grey'
          }
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  Tutorial: state.LoginReducer.Tutorial,
});

const AuthPhoneInputContainer = connect(mapStateToProps)(AuthPhoneInput);

export default AuthPhoneInputContainer;
