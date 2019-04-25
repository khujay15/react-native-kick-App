import React from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { DrawerItems } from 'react-navigation';
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
} from './DrawPage.styled';

export class DrawPage extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <DrawView>
            <DrawArrowTouch onPress={() => this.props.navigation.closeDrawer()}>
              <DrawArrowShape source={require('/assets/icons/ArrowLogo.png')} />
            </DrawArrowTouch>
            <NameView>
              <NameText> {this.props.Name}</NameText>
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
          </DrawView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
});

const DrawerContainer = connect(mapStateToProps)(DrawPage);
export default DrawerContainer;
