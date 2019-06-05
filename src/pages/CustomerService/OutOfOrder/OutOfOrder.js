import React from 'react';
import { Text, TextInput, Image, View, Picker, ActionSheetIOS ,Platform} from 'react-native';
import color from 'theme/color';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';

import * as s from './OutOfOrder.styled';
import { ScrollView } from 'react-native-gesture-handler';

export default class OutOfOrder extends React.Component {
    state= {
        location: '킥보드 주차 장소를 선택해주세요',
        clickList: [0],
    }

    ClickHandler = (id) => {
      let isIn = false;
      console.log(this.state.clickList);
      for(i in this.state.clickList)
      {
        if(this.state.clickList[i] === id)
        {
          this.setState({clickList: this.state.clickList.filter(item => item !== id)})
          isIn= true;
          break;
        }
      }
      if(!isIn)
      {
        this.setState({clickList: [...this.state.clickList,id]})
        console.log(this.state.clickList);
      }
   

      
    }

    handleViewStyle = (style, id) => {
      for(i in this.state.clickList)
      {
        if(this.state.clickList[i] === id)
        {
          style={
          ...style,
          borderWidth:1, 
          borderBottomWidth: 1,
        borderColor: color.oboon,
        color: color.oboon}

        }
      }
      return style;
    }

    handleTextStyle = (style, id) => {
      for(i in this.state.clickList)
      {
        if(this.state.clickList[i] === id)
        {
          style={
            ...style,
            fontWeight: 'normal',
        color: color.oboon
      }

        }
      }
      return style;
    }


    updateLocation = (loc) => {
      this.setState({location: loc});
  }
    showActionSheet() {
        const Loc = ['취소', '외국어대학관', "전자정보대학관"]
    ActionSheetIOS.showActionSheetWithOptions(
        {
          options: Loc,
          
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          
            if(buttonIndex >0)
            this.setState({location: Loc[buttonIndex]})
          
        },
      );
    }

  render() {
    const shadowStyle = {
      shadowRadius: 3,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 5 },
    };
    const TextStyle = {
      fontSize: 16,
      fontWeight: '200',
      color: color.grey,
    }

    return (
      <>
        <ScrollView style={{ flex: 1,  backgroundColor: 'white', }}>
          <Arrow onPress={() => this.props.navigation.navigate('cservice')} />
          <ThemeText style={{ marginBottom: 60 }}>고장신고</ThemeText>
          <View style={{marginHorizontal:24}}>
          <s.IndicatorText>킥보드 번호</s.IndicatorText>
          <InputBox
              keyboardType="numeric"
              onChangeText={this.handleName}
              placeholder="   킥보드 번호 4자리를 입력해주세요"
              placeholderTextColor="rgb(106, 106, 106)"
            />
            <s.IndicatorText>킥보드 위치</s.IndicatorText>
         
        <View>
        <InputBox
              onChangeText={this.handleName}
              placeholder="   킥보드 위치를 입력해주세요"
              placeholderTextColor="rgb(106, 106, 106)"
            />

         <s.IndicatorText style={{marginTop:10}}>고장난 부분 선택</s.IndicatorText>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:10}}>
            <s.SmallSelectBox style={this.handleViewStyle(shadowStyle,1)} onPress={() => this.ClickHandler(1)}>
                <Text style={this.handleTextStyle(TextStyle,1)}>가속레버</Text>
            </s.SmallSelectBox>

            <s.SmallSelectBox style={this.handleViewStyle(shadowStyle,2)} onPress={() => this.ClickHandler(2)}>
                <Text style={this.handleTextStyle(TextStyle,2)}>핸들</Text>
            </s.SmallSelectBox>

            <s.SmallSelectBox style={this.handleViewStyle(shadowStyle,3)} onPress={() => this.ClickHandler(3)}>
                <Text style={this.handleTextStyle(TextStyle,3)}>전원</Text>
            </s.SmallSelectBox>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:10, marginBottom: 10}}>
            <s.SmallSelectBox style={this.handleViewStyle(shadowStyle,4)} onPress={() => this.ClickHandler(4)}>
                <Text style={this.handleTextStyle(TextStyle,4)}>발판</Text>
            </s.SmallSelectBox>

            <s.SmallSelectBox style={this.handleViewStyle(shadowStyle,5)} onPress={() => this.ClickHandler(5)}>
                <Text style={this.handleTextStyle(TextStyle,5)}>앞바퀴</Text>
            </s.SmallSelectBox>

            <s.SmallSelectBox style={this.handleViewStyle(shadowStyle,6)} onPress={() => this.ClickHandler(6)}>
                <Text style={this.handleTextStyle(TextStyle,6)}>뒷바퀴</Text>
            </s.SmallSelectBox>
            </View>
            <s.SmallSelectBox style={this.handleViewStyle(shadowStyle,7)} onPress={() => this.ClickHandler(7)}>
                <Text style={this.handleTextStyle(TextStyle,7)}>기타</Text>
            </s.SmallSelectBox>

         </View>
         <s.IndicatorText>사진 첨부</s.IndicatorText>
          <s.SelectBox style={{width:100, height:100, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize:40, color: color.grey}}>+</Text>
          </s.SelectBox>
          <s.IndicatorText>상세 설명</s.IndicatorText>
          <s.DescriptionInput
             style={shadowStyle}
              placeholder="   상세한 설명을 적어주세요"
              placeholderTextColor="rgb(106, 106, 106)"
            />


          
          
          </View>
        </ScrollView>
        <FooterClick color={color.oboon} text={"신고하기"}/>

      </>
    );
  }
}
