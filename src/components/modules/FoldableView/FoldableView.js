import React, { Component } from 'react';
import {
  Text,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import * as s from './FoldableView.styled';

export default class FoldableView extends Component {
  constructor() {
    super();

    this.state = { expanded: false };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const iconImage = this.state.expanded
      ? require('assets/icons/Arrow.png')
      : require('assets/icons/NavImage.png');
    const ViewHeight = 300; // null if you want to fit in window
    return (
      <>
        <s.StyledBox activeOpacity={0.8} onPress={this.changeLayout}>
          <Text style={{ fontSize: 20 }}>{this.props.title}</Text>
          <Image source={iconImage} style={{ marginLeft: 'auto' }} />
        </s.StyledBox>
        <View
          style={{
            height: this.state.expanded ? ViewHeight : 0,
            overflow: 'hidden',
          }}
        >
          {this.props.children}
        </View>
      </>
    );
  }
}
