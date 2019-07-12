import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import { DrawerItems, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
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
  state = {
    Dummy: 1,
  };

  componentDidUpdate(prevState) {
    console.log('draw prev: ', prevState.navigation.state);
    console.log('draw this: ', this.props.navigation.state);
    return true;
  }

  render() {
    const dummy = this.props.navigation.getParam('dummy', 'NO-ID');

    return (
      <SafeAreaView>
        <ScrollView>
          <DrawView>
            <NameView>
              <NameText>{this.props.Name}</NameText>
              <Nim>님</Nim>
            </NameView>

            <EmailText>{this.props.Email}</EmailText>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Circle onPress={() => this.props.navigation.navigate('point')}>
                  <InnerCirCle>
                    <Image source={require('/assets/icons/Point.png')} />
                  </InnerCirCle>
                </Circle>
                <Text style={{ marginTop: 10, fontWeight: '200' }}>
                  내 포인트
                </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Circle
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
              <View style={{ alignItems: 'center' }}>
                <Circle onPress={() => this.props.navigation.navigate('usage')}>
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
                <NavImage
                  source={require('/assets/icons/NavImage_oboon.png')}
                />
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
