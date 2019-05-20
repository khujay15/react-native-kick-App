import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  NameView,
  NameText,
  DrawArrowTouch,
  DrawArrowShape,
  DrawView,
  Nim,
  NavItemView,
  NavImage,
  NavItemText,
  Line,
  Circle,
  InnerCirCle,
} from './DrawPage.styled';

export class DrawPage extends React.Component {
  _apitest() {
    const data = JSON.stringify({
      email: 'snsnsnsnsn@naver.com',
      phone_num: '01011111111',
      token: this.props.Token,
      name: '장재혁2',
      platform_type: 'kakao',
    });
    console.log(data);
    axios
      .post('https://api.oboonmobility.com/member/join', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <DrawView>
            <DrawArrowTouch onPress={() => this.props.navigation.closeDrawer()}>
              <DrawArrowShape source={require('/assets/icons/Arrow.png')} />
            </DrawArrowTouch>
            <NameView>
              <NameText> 
                {' '}
                {this.props.Name}
              </NameText>
              <Nim> 님</Nim>
            </NameView>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center', marginRight: 20 }}>
                <Circle
                  style={{
                    shadowRadius: 5,
                    shadowColor: 'rgb(0, 0, 0.7)',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 5 },
                  }}
                  onPress={() => this.props.navigation.navigate('coupon')}
                >
                  <InnerCirCle>
                    <Image source={require('/assets/icons/GoogleLogo.png')} />
                  </InnerCirCle>
                </Circle>
                <Text style={{ marginTop: 10, fontWeight: '200' }}>내쿠폰</Text>
              </View>

              <View style={{ alignItems: 'center', marginRight: 20 }}>
                <Circle
                  style={{
                    shadowRadius: 5,
                    shadowColor: 'rgb(0, 0, 0.7)',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 5 },
                  }}
                >
                  <InnerCirCle>
                    <Image source={require('/assets/icons/GoogleLogo.png')} />
                  </InnerCirCle>
                </Circle>
                <Text style={{ marginTop: 10, fontWeight: '200' }}>
                  지불정보
                </Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20 }}>
                <Circle
                  style={{
                    shadowRadius: 5,
                    shadowColor: 'rgb(0, 0, 0.7)',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 5 },
                  }}
                >
                  <InnerCirCle>
                    <Image source={require('/assets/icons/GoogleLogo.png')} />
                  </InnerCirCle>
                </Circle>
                <Text style={{ marginTop: 10, fontWeight: '200' }}>
                  이용내역
                </Text>
              </View>
            </View>
            <Line />
            <TouchableOpacity>
              <NavItemView>
                <NavItemText>공지사항</NavItemText>

                <NavImage source={require('/assets/icons/NavImage.png')} />
              </NavItemView>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this._apitest()}>
              <NavItemView>
                <NavItemText>이벤트</NavItemText>

                <NavImage source={require('/assets/icons/NavImage.png')} />
              </NavItemView>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this._apitest()}>
              <NavItemView>
                <NavItemText>고객지원</NavItemText>

                <NavImage source={require('/assets/icons/NavImage.png')} />
              </NavItemView>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this._apitest()}>
              <NavItemView>
                <NavItemText>설정</NavItemText>

                <NavImage source={require('/assets/icons/NavImage.png')} />
              </NavItemView>
            </TouchableOpacity>
          </DrawView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Token: state.LoginReducer.Token,
});

const DrawerContainer = connect(mapStateToProps)(DrawPage);
export default DrawerContainer;
