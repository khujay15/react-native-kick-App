import React from 'react';
import { TextInput, SafeAreaView, Text } from 'react-native';
import Arrow from '/components/modules/Arrow';
import { connect } from 'react-redux';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';
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

  componentDidMount() {}

  InputCheck = () => {
    return !this.state.IsError && this.state.IsPhoneInput === color.oboon;
  };

  render() {
    const { navigation } = this.props;
    const number = navigation.getParam('number', 'NO-Number');

    return (
      <>
        <DefaultArrowPage
          arrowOnPress={() => this.props.navigation.goBack()}
          themeText="전화번호 인증하기"
          footerOnPress={() =>
            this.props.Tutorial === 'watch'
              ? this.props.navigation.navigate('map')
              : this.props.navigation.navigate('tutorial')
          }
          footerColor={this.InputCheck() ? color.oboon : 'grey'}
          footerText="가입하기"
        >
          <PhoneMainView>
            <PhoneText Phone={number} />

            <TextInput
              keyboardType="numeric"
              onChangeText={this.handlePhone}
              autoFocus
            />

            <Line borderBottomColor={this.state.IsPhoneInput} />
          </PhoneMainView>

          <BottomText
            onPress={() => console.log('BottomText clicked')}
            Text="인증번호 재전송"
          />
        </DefaultArrowPage>
      </>
    );
  }
}

const mapStateToProps = state => ({
  Tutorial: state.LoginReducer.Tutorial,
});

const AuthPhoneInputContainer = connect(mapStateToProps)(AuthPhoneInput);

export default AuthPhoneInputContainer;
