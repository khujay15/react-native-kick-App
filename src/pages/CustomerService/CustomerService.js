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
    return (
      <>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Arrow onPress={() => this.props.navigation.navigate('mappage')} />
          <ThemeText style={{ marginBottom: 60 }}>고객지원</ThemeText>
          <s.SelectBoxOutside
            onPress={() => this.props.navigation.navigate('outoforder')}
          >
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

          <s.SelectBoxOutside
            onPress={() => this.props.navigation.navigate('FAQ')}
          >
            <SelectBox>
              <s.SelectBoxInside>
                <Text style={{ fontSize: 16 }}>자주 묻는 질문</Text>
                <Image
                  source={require('assets/icons/NavImage.png')}
                  style={{ marginLeft: 'auto', marginRight: 15 }}
                />
              </s.SelectBoxInside>
            </SelectBox>
          </s.SelectBoxOutside>

          {/* <s.SelectBoxOutside>
            <SelectBox>
              <s.SelectBoxInside>
                <Text style={{ fontSize: 16 }}>카카오톡으로 문의하기</Text>
                <Image
                  source={require('assets/icons/NavImage.png')}
                  style={{ marginLeft: 'auto', marginRight: 15 }}
                />
              </s.SelectBoxInside>
            </SelectBox>
          </s.SelectBoxOutside> */}
        </View>
      </>
    );
  }
}
