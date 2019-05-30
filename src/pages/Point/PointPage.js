import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import color from 'theme/color';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import FooterClick from 'components/modules/FooterClick';
import {connect} from 'react-redux';
import * as s from './Coupon.styled';

class PointPage extends React.Component {
  state = {
    Code: '',
    IsError: false,
    Cilcked: 1000,
  };

  handleCode = Text => {
    this.setState({ Code: Text });
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
          <ThemeText>포인트 충전하기</ThemeText>
          <s.CouponView>
            
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <s.ChangeMenu
                style={selectedShadow}
              >
                <Text style={{ color: 'white' }}>포인트 충전하기</Text>
              </s.ChangeMenu>
              <s.ChangeMenu2
                style={shadowStyle}
                onPress={() => this.props.navigation.navigate('coupon')}
              >
                <Text style={{ color: color.oboon }}>쿠폰 등록하기</Text>
              </s.ChangeMenu2>
            </View>

            <s.SelectBox style={this.handleStyle(shadowStyle, 1000)} onPress={() =>this.handleClick(1000)}>
            <s.SelectBoxInside>              
                <Text style={{marginLeft: 20,fontSize:16, color: 'rgb(106,106,106)'}}> 1000P 충전</Text>
                <Text style={{fontSize:16, color: color.oboon, marginLeft:'auto',marginRight: 20}}> 1000원</Text>
            </s.SelectBoxInside>
            </s.SelectBox>

            <s.SelectBox style={this.handleStyle(shadowStyle, 3000)} onPress={() =>this.handleClick(3000)}>
            <s.SelectBoxInside>              
                <Text style={{marginLeft: 20,fontSize:16, color: 'rgb(106,106,106)'}}> 3000P 충전</Text>
                <Text style={{fontSize:16, color: color.oboon, marginLeft:'auto',marginRight: 20}}> 3000원</Text>
            </s.SelectBoxInside>
            </s.SelectBox>

            <s.SelectBox style={this.handleStyle(shadowStyle, 5000)} onPress={() =>this.handleClick(5000)}>
            <s.SelectBoxInside>              
                <Text style={{marginLeft: 20,fontSize:16, color: 'rgb(106,106,106)'}}> 5000P 충전</Text>
                <Text style={{fontSize:16, color: color.oboon, marginLeft:'auto',marginRight: 20}}> 5000원</Text>
            </s.SelectBoxInside>
            </s.SelectBox>

          </s.CouponView>
        </View>
        <FooterClick color={color.oboon} text="충전하기" />
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
  