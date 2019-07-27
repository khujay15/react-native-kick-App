import React from 'react';
import { Platform, View, Text } from 'react-native';
import { SHADOW } from 'theme/shadow';
import * as s from './ClickBox.styled';

export default class ClickBox extends React.Component {
  render() {
    let BoxStyle = this.props.style;
    if (Platform.OS === 'ios') {
      BoxStyle = { ...BoxStyle, ...SHADOW.iosSmall };
    }
    return (
      <s.StyledClickBox onPress={this.props.onPress} style={BoxStyle}>
        {this.props.children}
      </s.StyledClickBox>
    );
  }
}
