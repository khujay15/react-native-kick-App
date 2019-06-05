import React from 'react';
import { Text, SafeAreaView, Image, View, ImageBackground } from 'react-native';
import color from 'theme/color';
import SelectBox from 'components/modules/SelectBox';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';

import { width, height } from 'theme/size';
import * as s from './CustomerService.styled';

export default class CustomerService extends React.Component {
  render() {
    const shadowStyle = {
      shadowRadius: 3,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 5 },
    };
    const width2 = width - 48;
    const shadowOpt = {
      width: width2,
      height: 50,

      color: '#000',
      border: 5,
      radius: 5,
      opacity: 0.1,
      x: 0,
      y: 5,
      style: { marginVertical: 5, marginRight: 5 },
    };

    return (
      <>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Arrow onPress={() => this.props.navigation.navigate('mappage')} />
          <ThemeText style={{ marginBottom: 60 }}>고객지원</ThemeText>
          <s.SelectBoxOutside onPress={()=> this.props.navigation.navigate('outoforder')}>
            <SelectBox>
              <s.SelectBoxInside>
                <Text style={{ fontSize: 16 }}>고장 신고</Text>
                <Image
                  source={require('assets/icons/NavImage.png')}
                  style={{ marginLeft: 'auto', marginRight: 15 }}
                />
              </s.SelectBoxInside>
            </SelectBox>
            </s.SelectBoxOutside>

            <s.SelectBoxOutside>
          <SelectBox>
            <s.SelectBoxInside>
              <Text style={{ fontSize: 16 }}>카카오톡으로 문의하기</Text>
              <Image
                source={require('assets/icons/NavImage.png')}
                style={{ marginLeft: 'auto', marginRight: 15 }}
              />
            </s.SelectBoxInside>
          </SelectBox>
          </s.SelectBoxOutside>


          <s.SelectBoxOutside>
          <SelectBox>
            <s.SelectBoxInside>
              <Text style={{ fontSize: 16 }}>카카오톡으로 문의하기</Text>
              <Image
                source={require('assets/icons/NavImage.png')}
                style={{ marginLeft: 'auto', marginRight: 15 }}
              />
            </s.SelectBoxInside>
          </SelectBox>
          </s.SelectBoxOutside>

        </View>
      </>
    );
  }
}
