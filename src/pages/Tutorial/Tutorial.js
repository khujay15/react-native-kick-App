import React from 'react';
import color from 'theme/color';
import { FlatList, View } from 'react-native';
import Arrow from 'components/modules/Arrow';
import NextPageArrow from 'components/modules/NextPageArrow';
import BottomText from 'components/modules/BottomText';
import FooterClick from 'components/modules/FooterClick';
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
      <SafeAreaView>
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
              img: require('assets/tutorials/Tutorial_2.png'),
              Text: '반납존에 반납해주세요',
              description:
                '라이딩이 끝나셨다면 지도에 표시되어 있는 반납존으로 이동하여 반납하기를 눌러주세요',
              key: 2,
            },
            {
              img: require('assets/tutorials/Tutorial_2.png'),
              Text: '운전면허증을 등록해주세요',
              description:
                '오분 서비스를 이용하기 위해서는 운전면허증 혹은 원동기 면허가 필요합니다',
              key: 3,
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

        <FooterClick color="grey" text="시작하기" />
      </SafeAreaView>
    );
  }
}

export default Tutorial;
