import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import color from 'theme/color';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import {connect} from 'react-redux';
import * as s from './Coupon.styled';

class Coupon extends React.Component {
  state = {
    Code: '',
    IsError: false,
  };

  handleCode = Text => {
    this.setState({ Code: Text });
  };

  render() {
    let shadowStyle = {
      shadowRadius: 4,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 5 },
    };
    
    let selectedShadow = {...shadowStyle,backgroundColor: color.oboon};
    return (
      <>
        <View style={{ flex: 1 }}>
          <Arrow onPress={() => this.props.navigation.navigate('mypoint')} />
          <ThemeText>쿠폰 등록하기</ThemeText>
          <s.CouponView>
           
            <View style={{ flexDirection: 'row' , marginBottom: 20}}>
              <s.ChangeMenu
                style={shadowStyle}
                onPress={() => this.props.navigation.navigate('pointpage')}
              >
                <Text style={{ color: color.oboon }}>포인트 충전하기</Text>
              </s.ChangeMenu>
              <s.ChangeMenu2
                style={selectedShadow}
              >
                <Text style={{ color: 'white' }}>쿠폰 등록하기</Text>
              </s.ChangeMenu2>
            </View>
              <View style={{marginLeft:1, marginRight: 1}}> 
            <InputBox
              onChangeText={this.handleCode}
              placeholder="  쿠폰을 입력해 주세요"
              placeholderTextColor="rgb(106, 106, 106)"
              toggle={this.state.IsError}
            />
            </View>
          </s.CouponView>
        </View>
        <FooterClick color={color.oboon} text="등록하기" />
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
  kickboard_serial : state.LentReducer.kickboard_serial,
  preSecond: state.LentReducer.preSecond,
});

const mapDispatchToProps = dispatch => ({
  updatePoint: (LeftPoint) => dispatch({type: 'UPDATE_POINT', point: LeftPoint}),
});

const CouponContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Coupon);

export default CouponContainer;