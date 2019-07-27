import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import color from 'theme/color';
import InputBox from 'components/modules/InputBox';
import { SHADOW } from 'theme/shadow';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';
import { connect } from 'react-redux';
import * as s from './Point.styled';

class Coupon extends React.Component {
  state = {
    Code: '',
    IsError: false,
  };

  handleCode = Text => {
    this.setState({ Code: Text });
  };

  InputCheck = () => {
    return !this.state.IsError && this.state.Code !== '';
  };

  render() {
    const selectedShadow = { ...SHADOW.iosSmall, backgroundColor: color.oboon };
    return (
      <>
        <DefaultArrowPage
          arrowOnPress={() => this.props.navigation.navigate('mypoint')}
          themeText="쿠폰 등록하기"
          footerColor={this.InputCheck() ? color.oboon : 'grey'}
          footerText="등록하기"
        >
          <View style={{ marginBottom: 30, marginHorizontal: 30 }}>
            <s.InnerText>현재 보유 포인트</s.InnerText>
            <s.PointText>
              {this.props.point}P
            </s.PointText>
          </View>

          <s.CouponView>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <s.ChangeMenu
                style={SHADOW.iosSmall}
                onPress={() => this.props.navigation.navigate('pointpage')}
              >
                <Text style={{ color: color.oboon }}>포인트 충전하기</Text>
              </s.ChangeMenu>
              <s.ChangeMenu2 style={selectedShadow}>
                <Text style={{ color: 'white' }}>쿠폰 등록하기</Text>
              </s.ChangeMenu2>
            </View>

              <InputBox
                onChangeText={this.handleCode}
                placeholder="쿠폰을 입력해 주세요"
                placeholderTextColor="rgb(106, 106, 106)"
                toggle={this.state.IsError}
              />

          </s.CouponView>
        </DefaultArrowPage>
      </>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Email: state.LoginReducer.Email,
  Token: state.LoginReducer.Token,
  Tutorial: state.LoginReducer.Tutorial,
  License: state.LoginReducer.License,
  Phone: state.LoginReducer.Phone,
  Status: state.LoginReducer.Status,
  point: state.LentReducer.point,
  kickboard_serial: state.LentReducer.kickboard_serial,
  preSecond: state.LentReducer.preSecond,
});

const mapDispatchToProps = dispatch => ({
  updatePoint: LeftPoint =>
    dispatch({ type: 'UPDATE_POINT', point: LeftPoint }),
});

const CouponContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Coupon);

export default CouponContainer;
