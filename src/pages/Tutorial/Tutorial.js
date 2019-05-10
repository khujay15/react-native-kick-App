import React from 'react';
import color from 'theme/color';
import { FlatList, View, Text, SafeAreaView, StyleSheet } from 'react-native';

import { width, height } from 'theme/size';
import SInfo from 'react-native-sensitive-info';

import { TouchableOpacity } from 'react-native-gesture-handler';
import * as s from './Tutorial.styled';

class Tutorial extends React.Component {
  state = {
    Currentpage: 0,
    bottomColor: color.grey,
  };

  onScrollEnd = e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible

    this.setState({
      Currentpage: Math.floor(contentOffset.x / viewSize.width),
    });
    if (Math.floor(contentOffset.x / viewSize.width) === 3) {
      this.setState({ bottomColor: color.oboon });
    }
  };

  handleBottom = () => {
    this.state.bottomColor === color.oboon
      ? this.props.navigation.navigate('mappage')
      : null;
  };

  componentDidMount = () => {
    SInfo.setItem('tutorials', 'watch', {});
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <s.TopTouch onPress={() => this.props.navigation.navigate('mappage')}>
            <View style={{ height: 100, width: 100 }}>
              <Text>건너뛰기</Text>
            </View>
          </s.TopTouch>
          <s.DotView>
            <s.Dotindicator
              color={this.state.Currentpage === 0 ? color.oboon : 'grey'}
            />
            <s.Dotindicator
              color={this.state.Currentpage === 1 ? color.oboon : 'grey'}
            />
            <s.Dotindicator
              color={this.state.Currentpage === 2 ? color.oboon : 'grey'}
            />
            <s.Dotindicator
              color={this.state.Currentpage === 3 ? color.oboon : 'grey'}
            />
          </s.DotView>

          <FlatList
            data={[
              {
                img: require('assets/tutorials/Tutorial_1.png'),
                Text: '오분존으로 이동해주세요',
                description:
                  '오분존에 대여 가능한 킥보드가 있는지 확인하고 대여를 위해 오분존으로 이동해주세요',
                key: 0,
              },
              {
                img: require('assets/tutorials/Tutorial_2.png'),
                Text: '헬멧을 착용해주세요',
                description:
                  '오분을 이용하기 위해서는 헬멧을 착용해야합니다! 안전을 위해 헬멧 착용을 해주세요',
                key: 1,
              },
              {
                img: require('assets/tutorials/Tutorial_3.png'),
                Text: '반납존에 반납해주세요',
                description:
                  '라이딩이 끝나셨다면 지도에 표시되어 있는 반납존으로 이동하여 반납하기를 눌러주세요',
                key: 2,
              },
              {
                img: require('assets/tutorials/Tutorial_4.png'),
                Text: '운전면허증을 등록해주세요',
                description:
                  '오분 서비스를 이용하기 위해서는 운전면허증 혹은 원동기 면허가 필요합니다',
                key: 3,
              },
            ]}
            style={{ marginLeft: 24, marginRight: 24, marginTop: 50 }}
            renderItem={({ item }) => (
              <View>
                <s.TutorialView>
                  <s.ThemeText>{item.Text}</s.ThemeText>
                  <s.Description>{item.description}</s.Description>
                  <s.TutorialImage source={item.img} />
                </s.TutorialView>
              </View>
            )}
            horizontal
            keyExtractor={(item, index) => `key${index}`}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={this.onScrollEnd}
          />

          <s.FooterTouch
            color={this.state.bottomColor}
            onPress={this.handleBottom}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>시작하기</Text>
          </s.FooterTouch>
        </SafeAreaView>
      </>
    );
  }
}

export default Tutorial;
