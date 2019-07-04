import React from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import color from 'theme/color';
import { width, height } from 'theme/size';
import * as s from './TutorialPopup.styled';

export default class TutorialPopup extends React.Component {
    state ={
        Currentpage : 0,
        bottomColor: 'grey'

    };
    componentDidMount () {
        SInfo.setItem('tutorials', 'watch', {});
    }
  toggleOff = () => {
    this.props.onExit();
  };
  onScrollEnd = e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    console.log("contentOffset: ", contentOffset);
    console.log("viewSize: ", viewSize);

    // Divide the horizontal offset by the width of the view to see which page is visible

    this.setState({
      Currentpage: Math.round(contentOffset.x / viewSize.width),
    });
    if (Math.round(contentOffset.x / viewSize.width) === 2) {
      this.setState({ bottomColor: color.oboon });
    }
  };

  handleBottom = () => {
    this.toggleOff();
  };

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log("Visible items are", viewableItems);
    this.setState({Currentpage: viewableItems.length-1});
    console.log("Changed in this iteration", changed);
  };



  render() {
    const MarginTOP = height * 0.15 < 120 ? height * 0.15 : height * 0.3;
    return (
        <>
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <View
          style={{ flex: 1, opacity: 0.3, backgroundColor: 'rgb(78,78,78)' }}
        />
        <View style={{position: 'absolute'}}>
        <View
          style={{
           
            shadowRadius: 4,
            shadowColor: 'rgb(0, 0, 0.7)',
            shadowOpacity: 0.08,
            shadowOffset: { width: 0, height: 3 },
            backgroundColor: 'white',
            borderRadius: 5,
            borderColor: '#C0C0C0',
            borderWidth: 1,
            marginLeft: 30,
            marginRight: 30,
            marginTop: MarginTOP,
            height: 400,
            width: width * 0.85,
          }}
          
        >
            <View style={{marginTop:20, marginLeft:20, flexDirection: 'row'}}>
            <s.Dotindicator
              color={this.state.Currentpage === 0 ? color.oboon : 'grey'}
            />
            <s.Dotindicator
              color={this.state.Currentpage === 1 ? color.oboon : 'grey'}
            />
            <s.Dotindicator
              color={this.state.Currentpage === 2 ? color.oboon : 'grey'}
            />
          
          </View>
          <View style={{justifyContent: 'center', alignContent: 'center', flex:1}}>
          <FlatList
           onViewableItemsChanged={this.onViewableItemsChanged }
            data={[
              {
                img: require('assets/popup/Tutorialpopup_1.png'),
                Text: '발을 두번 굴러 킥보드를 움직이세요!',
               
                key: 0,
              },
              {
                img: require('assets/popup/Tutorialpopup_2.png'),
                Text: '오른쪽의 가속 레버를 누르세요',
              
                key: 1,
              },
              {
                img: require('assets/popup/Tutorialpopup_3.png'),
                Text: '멈출땐 왼쪽 브레이크를 잡아주세요',
            
                key: 2,
              },
            ]}
            style={{marginBottom:20,  alignContent: 'center'}}
            renderItem={({ item }) => (
              <View style={{width: width*0.85, alignItems: 'center', marginTop:20 }}>
                <View style={{ alignContent: 'center'}}>
                <Image source={item.img} style={{alignSelf: 'center'}}/>
                <Text style={{fontSize:16, marginTop:30}}>{item.Text}</Text>
                </View>
              </View>
            )}
            horizontal
            keyExtractor={(item, index) => `key${index}`}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={this.onScrollEnd}
          />
          </View>

        <s.FooterTouch
            color={this.state.bottomColor}
            onPress={this.handleBottom}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>시작하기</Text>
        </s.FooterTouch>
        </View>
        </View>
      </Modal>
      </>
    );
  }
}
