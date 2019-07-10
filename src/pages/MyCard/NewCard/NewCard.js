import React from 'react';
import { Text, View, Platform } from 'react-native';
import Arrow from '/components/modules/Arrow';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import { connect } from 'react-redux';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';

import { SignUpMainView, BottomText } from './NewCard.styled';

class NewCard extends React.Component {
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

  handleFooter = () => {
    this.props.hasPayment();
    this.props.navigation.goBack();
  };

  InputCheck = () => {
    return (
      this.state.CardNumber &&
      this.state.CardDate &&
      this.state.Birth &&
      this.state.PasswordTwo
    );
  };

  render() {
    return (
      <DefaultArrowPage
        arrowOnPress={() => this.props.navigation.goBack()}
        themeText="지불 정보 등록"
        greyText="사용하실 카드 정보를 입력해주세요"
        footerText="등록하기"
        footerColor={this.InputCheck() ? color.oboon : 'grey'}
        footerOnPress={() => (this.InputCheck() ? this.handleFooter() : null)}
      >
        <SignUpMainView>
          <InputBox
            onChangeText={this.handleCardNumber}
            placeholder="카드번호를 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            keyboardType="numeric"
            maxLength={16}
          />
          <View style={{ marginBottom: 20 }} />

          <InputBox
            onChangeText={this.handleCardDate}
            placeholder="만료일을 입력해주세요 MM / YY"
            placeholderTextColor="rgb(106, 106, 106)"
            keyboardType="numeric"
            maxLength={4}
          />
          <View style={{ marginBottom: 20 }} />

          <InputBox
            onChangeText={this.handleBirth}
            placeholder="생년원일 6자리를 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            keyboardType="numeric"
            maxLength={6}
          />
          <View style={{ marginBottom: 20 }} />

          <InputBox
            onChangeText={this.handlePasswordTwo}
            placeholder="비밀번호 앞 2자리를 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            keyboardType="numeric"
            maxLength={2}
          />
          <View style={{ marginBottom: 20 }} />

          <BottomText>지불 등록된 카드로 이용요금이 부과됩니다.</BottomText>
        </SignUpMainView>
      </DefaultArrowPage>
    );
  }
}

const mapStateToProps = state => ({
  Payment: state.LoginReducer.Payment,
});

const mapDispatchToProps = dispatch => ({
  hasPayment: () => dispatch({ type: 'PAYMENT' }),
});

const NewCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCard);

export default NewCardContainer;
