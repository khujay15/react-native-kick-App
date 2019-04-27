import React from 'react';
import { Modal, Image, Text, TouchableOpacity } from 'react-native';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import * as s from './OboonZone.styled';

const OboonZone = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {}}
    >
      <s.ModalClick>
        <s.Arrow onPress={props.onPress} />
        <s.MainView>
          <s.MainText>오분존 정보</s.MainText>
          <Text>경희대학교 국제캠퍼스 체육대학</Text>
          <s.PurpleLine />
          <s.ZonePhoto
            source={{
              uri:
                'https://www.khu.ac.kr/kor/resources/user/img/pc/common/logo.png',
            }}
          />

          <s.SubText>주소</s.SubText>
          <Text>{props.location}</Text>
          <s.GrayLine />
        </s.MainView>
      </s.ModalClick>
    </Modal>
  );
};
export default OboonZone;
