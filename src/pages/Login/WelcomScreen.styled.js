import styled from 'styled-components';
import { Image, StyleSheet, Dimensions, Platform } from 'react-native';

import React from 'react';

const { height, width } = Dimensions.get('window');

export const ImgStyle = StyleSheet.create({
  banner: {
    height: 60,
    marginTop: height * 0.25,
    alignSelf: 'center',
  },
  innerImage: {
    width: 34,
    height: 34,
    marginLeft: 14,
    marginRight: 30,
    alignSelf: 'center',
  },
});

export const MainLogo = () => {
  return (
    <Image
      source={require('/assets/icons/ic_logo.png')}
      style={ImgStyle.banner}
    />
  );
};
export const InnerImage = props => {
  return <Image source={props.src} style={ImgStyle.innerImage} />;
};
export const GoogleLoginTouch = styled.TouchableOpacity`
  border-width: 0.3;
  border-radius: 1;
  border-color: #ddd;
  border-top-width: 0;
  border-bottom-width: 0.3;
  shadow-color: #000;
  shadow-opacity: 0;
  shadow-radius: 2;
  elevation: 1;
  height: 50;
  flex-direction: row;
  margin-top: ${height * 0.25};
  margin-left: 24;
  margin-right: 24;
  align-items: center;
`;
export const KakaoLoginTouch = styled.TouchableOpacity`
  border-width: 0.3;
  border-radius: 1;
  border-color: #ddd;
  border-top-width: 0;
  border-bottom-width: 0.3;
  shadow-color: #000;
  shadow-opacity: 0;
  shadow-radius: 2;
  elevation: 1;
  height: 50;
  flex-direction: row;
  margin-top: 26;
  margin-left: 24;
  margin-right: 24;
  align-items: center;
`;

export const LocalLoginTouch = styled.TouchableOpacity`
  border-width: 0.3;
  border-radius: 1;
  border-color: #ddd;
  border-top-width: 0;
  border-bottom-width: 0.3;
  shadow-color: #000;
  shadow-opacity: 0;
  shadow-radius: 2;
  elevation: 1;
  height: 50;
  flex-direction: row;
  margin-top: 26;
  margin-left: 24;
  margin-right: 24;
  align-items: center;
`;

export const InnerText = styled.Text`
  margin-left: ${props => (props.local ? 80 : 0)};

  font-size: 20px;
  color: grey;
`;

export const BottomView = styled.View`
  margin-top: auto;
  flex-direction: row;
  align-self: center;
  margin-bottom: 30;
`;

export const BottomText = styled.Text`
  font-size: 14px;
  color: grey;
`;
