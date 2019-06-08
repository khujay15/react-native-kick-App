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
  EmailText,
} from './DrawPage.styled';

export class DrawPage extends React.Component {
  render() {
    const shadowStyle = {
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 6,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.12,
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <DrawView>
            <DrawArrowTouch onPress={() => this.props.navigation.closeDrawer()}>
              <Image source={require('/assets/icons/Arrow.png')} />
            </DrawArrowTouch>
            <NameView>
              <NameText>{this.props.Name}</NameText>
              <Nim> 님</Nim>
            </NameView>
            <EmailText>{this.props.Email}</EmailText>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center', marginRight: 20 }}>
                <Circle
                  style={shadowStyle}
                  onPress={() => this.props.navigation.navigate('coupon')}
                >
                  <InnerCirCle>
                    <Image source={require('/assets/icons/Point.png')} />
                  </InnerCirCle>
                </Circle>
                <Text style={{ marginTop: 10, fontWeight: '200' }}>
                  내 포인트
                </Text>
              </View>

              <View style={{ alignItems: 'center', marginRight: 20 }}>
                <Circle
                  style={shadowStyle}
                  onPress={() => this.props.navigation.navigate('mycard')}
                >
                  <InnerCirCle>
                    <Image source={require('/assets/icons/Card.png')} />
                  </InnerCirCle>
                </Circle>
                <Text style={{ marginTop: 10, fontWeight: '200' }}>
                  지불정보
                </Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20 }}>
                <Circle
                  style={shadowStyle}
                  onPress={() => this.props.navigation.navigate('usage')}
                >
                  <InnerCirCle>
                    <Image source={require('/assets/icons/History.png')} />
                  </InnerCirCle>
                </Circle>
                <Text style={{ marginTop: 10, fontWeight: '200' }}>
                  이용내역
                </Text>
              </View>
            </View>
            <Line />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('setting')}
            >
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
  Email: state.LoginReducer.Email,
});

const DrawerContainer = connect(mapStateToProps)(DrawPage);
export default DrawerContainer;
