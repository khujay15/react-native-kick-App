import React from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Arrow from 'components/modules/Arrow';
import FooterClick from 'components/modules/FooterClick';
import * as s from './LentInput.styled';

export default class LentInput extends React.Component {
  state = {
    firstCode: '',
    secondCode: '',
    thirdCode: '',
    fourthCode: '',
  };

  toggleOff = () => {
    this.props.onPress();
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <Arrow onPress={this.toggleOff} />
        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 100 }}>
          <Text style={{ fontSize: 24 }}>킥보드 '어디'의</Text>
          <Text style={{ fontSize: 24 }}> 숫자 4자리를 입력해주세요</Text>
        </View>

        <s.LentView>
          <s.Digit
            keyboardType="numeric"
            maxLength={1}
            autoFocus
            onChangeText={code => {
              this.setState({ firstCode: code });
              this.second.focus();
            }}
          />
          <s.Digit
            keyboardType="numeric"
            maxLength={1}
            ref={ref => (this.second = ref)}
            onChangeText={code => {
              this.setState({ secondCode: code });
              this.third.focus();
            }}
          />
          <s.Digit
            keyboardType="numeric"
            maxLength={1}
            ref={ref => (this.third = ref)}
            onChangeText={code => {
              this.setState({ thirdCode: code });
              this.fourth.focus();
            }}
          />
          <s.Digit
            keyboardType="numeric"
            maxLength={1}
            ref={ref => (this.fourth = ref)}
            onChangeText={code => {
              this.setState({ fourthCode: code });
            }}
          />
        </s.LentView>

        <FooterClick
          color="grey"
          text="대여하기"
          onPress={() => console.log(this.state)}
        />
      </Modal>
    );
  }
}
