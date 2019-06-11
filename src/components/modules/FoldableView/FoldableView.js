import React, { Component } from 'react';
import {
  Text,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import { SHADOW } from 'theme/shadow';
import { BoxShadow } from 'react-native-shadow';
import { width } from 'theme/size';
import { color } from 'theme';
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
  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y
    })
    console.log(this.state.height);
  }

  render() {
    const iconImage = this.state.expanded
      ? require('assets/icons/Arrow.png')
      : require('assets/icons/NavImage_oboon.png');
    const ViewHeight = 60; // null if you want to fit in window

    if (Platform.OS === 'ios') {
      const ShadowStyle = SHADOW.iosSmall;
      return (
        <>
          <s.StyledBox
            activeOpacity={0.8}
            onPress={this.changeLayout}
            style={SHADOW.iosSmall}
          >
            <s.InnerView
              style={{
                height: this.state.expanded ? null : ViewHeight,
              }}
              
            >
              <s.TitleView>
                <Text style={{ fontSize: 16 }}>{this.props.title}</Text>
                <Image
                  source={iconImage}
                  style={{ marginLeft: 'auto', height: 16 }}
                />
              </s.TitleView>

              <View
                style={{
                 
                  backgroundColor: 'white',
                  height: this.state.expanded ? null : 0,
                }}
              >
                <View
                  style={{
                    borderBottomWidth: this.state.expanded ? 0.5 : 0,
                    marginHorizontal: 2,
                    marginBottom: 5,
                  }}
                />
                {this.props.children}
              </View>
            </s.InnerView>
          </s.StyledBox>
        </>
      );
    }

    const shadowAndroid = {
      ...SHADOW.android,
      width: width - 48,
      height: this.state.expanded ?  null: 60,
    };
    return (
      <>
        <BoxShadow setting={shadowAndroid}>
          <s.StyledBox activeOpacity={0.8} onPress={this.changeLayout}>
            <s.InnerView
              style={{
                height: this.state.expanded ? null : ViewHeight,
                elevation : this.state.expanded ? 1 : null,
              }}

              
            >
              <s.TitleView>
                <Text style={{ fontSize: 16 }}>{this.props.title}</Text>
                <Image
                  source={iconImage}
                  style={{ marginLeft: 'auto'}}
                />
              </s.TitleView>

              <View
                  style={{
                    borderBottomWidth: this.state.expanded ? 0.5 : 0,
                    marginBottom: 5,
                  }}
                />

              {this.state.expanded && (
                <View
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  {this.props.children}
                </View>
              )}
            </s.InnerView>
          </s.StyledBox>
        </BoxShadow>
      </>
    );
  }
}
