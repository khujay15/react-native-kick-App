import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import color from 'theme/color';
import FooterClick from 'components/modules/FooterClick';
import * as s from './DefaultArrowPage.styled';

export default class DefaultArrowPage extends React.Component {
  render() {
    return (
      <>
        <View style={{ flex: 1, marginTop: 10 }}>
          <s.arrowTouch onPress={this.props.arrowOnPress}>
            <s.arrowImage source={require('/assets/icons/Arrow.png')} />
          </s.arrowTouch>
          <s.ThemeText greyText={this.props.greyText}>
            {this.props.themeText}
          </s.ThemeText>

          {this.props.greyText && (
            <View
              style={{
                marginHorizontal: 30,
                marginBottom: 60,
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
