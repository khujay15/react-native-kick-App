import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import color from 'theme/color';
import { SHADOW } from 'theme/shadow';
import SelectBox from 'components/modules/SelectBox';
import FoldableView from 'components/modules/FoldableView';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import {width, height} from 'theme/'

export default class FAQservice extends React.Component {
  render() {

    return (
      <>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Arrow onPress={() => this.props.navigation.goBack()} />
          <ThemeText style={{ marginBottom: 40 }}>자주 묻는 질문</ThemeText>

          <ScrollView style={{ marginHorizontal: 24 }}>
            <View style={{ marginVertical: 10 }} />
            {/* 여백 */}
            <FoldableView title="따로 문의하고 싶어요">
              <View style={{ marginVertical: 10 }}>
                <Text>
                  oboonmakers@gmail.com 으로 이메일 주시면 성실하게 처리하도록
                  하겠습니다.
                </Text>
              </View>
            </FoldableView>

            <View style={{ marginVertical: 10 }} />
            {/* 여백 */}
           
            <FoldableView  title="왜 면허가 필요한가요?">
              <View style={{ marginVertical: 10 }}>
                <Text>
                  도로교통법 제2조 제19호에 따르면 ‘배기량 50cc 미만(전기를
                  동력으로 하는 경우에는 정격출력 0.59kW 미만)의 원동기를 단
                  차’는 모두 원동기 장치자전거이며,원동기장치 자전거를 운전하기
                  위해서는ㅍ운전면허가 필요합니다. 만16세부터 취득할 수 있는 2종
                  원동기장치자전거 면허, 또는 그 밖의 1·2종 운전면허를 취득한
                  경우 운전이 가능합니다.
                </Text>
              </View>
            </FoldableView>

            <View style={{ marginVertical: 10 }} />
            {/* 여백 */}
            <FoldableView  title="인도에서 주행해도 괜찮을까요">
              <View style={{ marginVertical: 10 }}>
                <Text>
                  전동킥보드는 오토바이와 같은 법적 지위를 가지고 있기에
                  차도에서 주행하여야 합니다. 도로교통법 제 20조(진로 양보의
                  의무)에 따라 차도의 우측 가장자리를 이용해 다른 차의 진로를
                  양보하며 주행하여야 합니다.
                </Text>
              </View>
            </FoldableView>

            <View style={{ marginVertical: 10 }} />
            {/* 여백 */}
            <FoldableView  title="헬멧을 꼭 착용해야 될까요?">
              <View style={{ marginVertical: 10 }}>
                <Text>
                  안전모 착용은 이륜자동차와 원동기장치자전거, 자전거 운전자의
                  의무사항으로 도로교통법 제50조제3항에 규정되어 있습니다.
                </Text>
              </View>
            </FoldableView>
            <View style={{ marginVertical: 10 }} />
            {/* 여백 */}
          </ScrollView>
        </View>
      </>
    );
  }
}
