import React from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
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
              <DrawArrowShape source={require('/assets/icons/ArrowLogo.png')} />
            </DrawArrowTouch>
            <NameView>
              <NameText> 
                {' '}
                {this.props.Name}
              </NameText>
              <Nim> 님</Nim>
            </NameView>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('coupon')}
            >
              <NavItemView>
                <NavItemText>쿠폰</NavItemText>

                <NavImage source={require('/assets/icons/NavImage.png')} />
              </NavItemView>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this._apitest()}>
              <NavItemView>
                <NavItemText>test</NavItemText>

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
