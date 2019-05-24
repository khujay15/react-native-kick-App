import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';

import { width, height } from 'theme/size';
import color from 'theme/color';
import SmartKey from 'pages/SmartKey';
import * as s from './SmartKeyModal.styeld';

export default class SmartKeyModal extends React.Component {
  state = {
    keyModalVisible: false,
  };

  render() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    return (
      <>
        <SmartKey
          visible={this.state.keyModalVisible}
          onPress={() => this.setState({ keyModalVisible: false })}
        />

        {/* <Modal
          animationType="slide"
          transparent
          visible={this.state.returnModalVisible}
          onRequestClose={() => {}}
        >
          <View
            style={{ flex: 1, opacity: 0.3, backgroundColor: 'rgb(78,78,78)' }}
          />
         <s.DummyView>
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
             
              
              height: 550,

              width: width * 0.85,
            }}
          >
            <s.InnerView>
              <Text style={{ fontSize: 20, marginBottom: height * 0.05 }}>
                반납이 완료되었습니다!
              </Text>

              <Text style={{ fontSize: 20 , marginBottom: 25}}>{`${yyyy}.${mm}.${dd}`}</Text>


              <s.LineView>
                <s.Dot />
                <Text style={{marginRight: 15, fontSize: 16}}>16 : 37</Text>
                <Text style={{fontSize: 16, fontWeight: '300'}}>경희대학교 외국어대학</Text>
              </s.LineView>
            
              <View style={{marginLeft: 3, height: 30}}>
                
              </View>
   

              <s.LineView>
                <s.Dot />
                <Text style={{marginRight: 15, fontSize: 16}}>16 : 39</Text>
                <Text style={{fontSize: 16, fontWeight: '300'}}>경희대학교 체육대학</Text>
              </s.LineView>
                    <s.GrayLine/>

              <s.InfoView>

                <Text style={{fontSize:16 }}>초과시간</Text>
                <Text style={{fontSize:16,marginLeft: 'auto' ,fontWeight: '200'}}>00: 00</Text>

              </s.InfoView>

              <s.InfoView>

              <Text style={{fontSize:16 }}>초과과금</Text>
              <s.RightText>0000 원</s.RightText>

              </s.InfoView>


              <s.InfoView>

              <Text style={{fontSize:16 }}>총 사용시간</Text>
              <s.RightText>00 : 00</s.RightText>

              </s.InfoView>


              <s.InfoView>

              <Text style={{fontSize:16 }}>총 이동거리</Text>
              <s.RightText>0.0 km</s.RightText>

              </s.InfoView>

              <Text style={{fontSize:16 }}>결재금액</Text>
              <Text style={{fontSize:16 }}>(기본금 + 초과과금)</Text>
             <s.TotalCost>0000 원</s.TotalCost>
          

            </s.InnerView>

            <s.FooterTouch
              onPress={() => this.setState({ returnModalVisible: false })}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>확인</Text>
            </s.FooterTouch>
          </View>
          </s.DummyView>
        </Modal> */}

        <s.BotButton onPress={() => this.setState({ keyModalVisible: true })}>
          <Text style={{ color: 'white', fontSize: 20 }}> 스마트키 </Text>
        </s.BotButton>
      </>
    );
  }
}
