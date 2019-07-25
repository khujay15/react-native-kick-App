import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import color from 'theme/color';
import SelectBox from 'components/modules/SelectBox';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';
import {SHADOW} from 'theme/shadow';
import {connect} from 'react-redux';
import {Iamport } from './IAMPORT/Iamport';
import * as s from './Point.styled';

class PointPage extends React.Component {
  state = {
    IsError: false,
    Clicked: 0,
  };

  handleClick= (Won) => {
      this.setState({Clicked: Won});
  }
  handleStyle = (style, Won) => {
      if(Won===this.state.Clicked)
      {
          style={
              ...style,
              borderWidth:1, 
              borderBottomWidth: 1,
            borderColor: color.oboon,}

            return style;   
      }
      else return style;
  }
  InputCheck = () => {
    return this.state.Clicked !== 0;
  }

  handleFooter = () => {
    this.props.navigation.navigate('Iamport',{POINT: this.state.Clicked} );
  }
 

  render() {
    let SelectStyle = {};
    let selectedShadow = {...SHADOW.iosSmall,backgroundColor: color.oboon};
    return (
      <>
          <DefaultArrowPage
          arrowOnPress={() => this.props.navigation.navigate('mypoint')}
          themeText="포인트 충전하기"
          footerColor={this.InputCheck() ? color.oboon : 'grey'}
          footerOnPress={() => (this.InputCheck() ? this.handleFooter() : null)}
          footerText="충전하기"
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
                style={selectedShadow}
              >
                <Text style={{ color: 'white' }}>포인트 충전하기</Text>
              </s.ChangeMenu>
              <s.ChangeMenu2
                style={SHADOW.iosSmall}
                onPress={() => this.props.navigation.navigate('coupon')}
              >
                <Text style={{ color: color.oboon }}>쿠폰 등록하기</Text>
              </s.ChangeMenu2>
            </View>
            </s.CouponView>

            <s.SelectBoxOutside onPress={() =>this.handleClick(1000)} style={this.handleStyle(SelectStyle, 1000)} >
            <SelectBox>
              <s.SelectBoxInside>
              <Text style={{fontSize:16, color: 'rgb(106,106,106)'}}> 1000P 충전</Text>
              <Text style={{fontSize:16, color: color.oboon, marginLeft:'auto',marginRight: 20}}> 1000원</Text>
              </s.SelectBoxInside>
            </SelectBox>
            </s.SelectBoxOutside>

            <s.SelectBoxOutside onPress={() =>this.handleClick(3000)} style={this.handleStyle(SelectStyle, 3000)} >
            <SelectBox>
              <s.SelectBoxInside>
              <Text style={{fontSize:16, color: 'rgb(106,106,106)'}}> 3000P 충전</Text>
              <Text style={{fontSize:16, color: color.oboon, marginLeft:'auto',marginRight: 20}}> 3000원</Text>
              </s.SelectBoxInside>
            </SelectBox>
            </s.SelectBoxOutside>

            <s.SelectBoxOutside onPress={() =>this.handleClick(5000)} style={this.handleStyle(SelectStyle, 5000)} >
            <SelectBox>
              <s.SelectBoxInside>
              <Text style={{fontSize:16, color: 'rgb(106,106,106)'}}> 5000P 충전</Text>
              <Text style={{fontSize:16, color: color.oboon, marginLeft:'auto',marginRight: 20}}> 5000원</Text>
              </s.SelectBoxInside>
            </SelectBox>
            </s.SelectBoxOutside>
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
    kickboard_serial : state.LentReducer.kickboard_serial,
    preSecond: state.LentReducer.preSecond,
  });
  
  const mapDispatchToProps = dispatch => ({
    updatePoint: (LeftPoint) => dispatch({type: 'UPDATE_POINT', point: LeftPoint}),
  });
  
  const PointContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PointPage);
  
  export default PointContainer;
  