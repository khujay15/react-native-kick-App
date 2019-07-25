import React from 'react';
import { Platform, View, Text } from 'react-native';
import { height } from 'theme/size';
import color from 'theme/color';
import FooterClick from 'components/modules/FooterClick';
import * as s from './DefaultArrowPage.styled';

export default class DefaultArrowPage extends React.Component {
  render() {
    const MARGINTOP = Platform.OS === 'ios' ? 10 : 0;
    // const MARGINBOT = Platform.OS === 'ios' ?
    return (
      <>
        <View style={{ flex: 1, marginTop: MARGINTOP }}>
          <s.arrowTouch onPress={this.props.arrowOnPress}>
            <s.arrowImage source={require('/assets/icons/Arrow.png')} />
          </s.arrowTouch>
          <s.ThemeText greyText={this.props.greyText} marginTop={MARGINTOP}>
            {this.props.themeText}
          </s.ThemeText>

          {this.props.greyText && (
            <View
              style={{
                marginHorizontal: 30,
                marginBottom: height * 0.06,
              }}
            >
              <Text style={{ color: color.grey, fontWeight: '200' }}>
                {this.props.greyText}
              </Text>
            </View>
          )}

          {this.props.children}
        </View>
        {this.props.footerText && (
          <FooterClick
            onPress={this.props.footerOnPress}
            color={this.props.footerColor}
            text={this.props.footerText}
          />
        )}
      </>
    );
  }
}
