import React from 'react';
import { Text, SafeAreaView, Image, View } from 'react-native';
import color from 'theme/color';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';

import * as s from './CustomerService.styled';

export default class CustomerService extends React.Component {
  render() {
    const shadowStyle = {
      shadowRadius: 3,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 5 },
    };

    return (
      <>
        <View style={{ flex: 1 }}>
          <Arrow onPress={() => this.props.navigation.navigate('mappage')} />
          <ThemeText style={{ marginBottom: 60 }}>고객지원</ThemeText>
          <s.SelectBox
            style={shadowStyle}
            onPress={() => this.props.navigation.navigate('outoforder')}
          >
            <s.SelectBoxInside>
              <Text style={{ fontSize: 16 }}>고장신고</Text>
              <Image
                source={require('assets/icons/NavImage.png')}
                style={{ marginLeft: 'auto', marginRight: 15 }}
              />
            </s.SelectBoxInside>
          </s.SelectBox>
          <s.SelectBox style={shadowStyle}>
            <s.SelectBoxInside>
              <Text style={{ fontSize: 16 }}>카카오톡으로 문의하기</Text>
              <Image
                source={require('assets/icons/NavImage.png')}
                style={{ marginLeft: 'auto', marginRight: 15 }}
              />
            </s.SelectBoxInside>
          </s.SelectBox>
          <s.SelectBox style={shadowStyle}>
            <s.SelectBoxInside>
              <Text style={{ fontSize: 16 }}>자주하는 질문</Text>
              <Image
                source={require('assets/icons/NavImage.png')}
                style={{ marginLeft: 'auto', marginRight: 15 }}
              />
            </s.SelectBoxInside>
          </s.SelectBox>
        </View>
      </>
    );
  }
}
