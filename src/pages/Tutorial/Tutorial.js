import React from 'react';
import color from 'theme/color';
import { FlatList, View } from 'react-native';
import Arrow from 'components/modules/Arrow';
import NextPageArrow from 'components/modules/NextPageArrow';
import BottomText from 'components/modules/BottomText';
import { width, height } from 'theme/size';
import { SafeAreaView } from 'react-navigation';
import SInfo from 'react-native-sensitive-info';
import * as s from './Tutorial.styled';

class Tutorial extends React.Component {
  state = {
    Currentpage: 0,
  };

  onScrollEnd = e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible

    this.setState({
      Currentpage: Math.floor(contentOffset.x / viewSize.width),
    });
  };

  componentDidMount = () => {
    SInfo.setItem('tutorials', 'watch', {});
  };

  render() {
    return (
      <>
        <FlatList
          data={[
            {
              img: require('assets/tutorials/Tutorial_1.png'),
              Text: '내 주변의 대여장소를 찾아보세요',
              description:
                '타고 싶은 킥보드를 찾았다면, 킥보드 근처로 이동해 이용하기 버튼을 눌러주세요.',
              key: 1,
            },
            {
              img: require('assets/tutorials/Tutorial_2.png'),
              Text: '헬멧을 착용해주세요',
              description:
                '도로교통법에 따라, 오분을 이용하기 위해선 원동기 면허가 있어야 합니다. 또한, 원동기 자전거로 분류되기 때문에, 차도에서 운행해야 합니다.',
              key: 2,
            },
          ]}
          style={{ marginLeft: 24, marginRight: 24 }}
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
        <s.DotView>
          <s.Dotindicator
            color={this.state.Currentpage === 0 ? color.oboon : 'grey'}
          />
          <s.Dotindicator
            color={this.state.Currentpage === 1 ? color.oboon : 'grey'}
          />
        </s.DotView>
        <BottomText
          Text="건너뛰기"
          onPress={() => this.props.navigation.navigate('map')}
        />
        <NextPageArrow color="grey" />
      </>
    );
  }
}

export default Tutorial;
