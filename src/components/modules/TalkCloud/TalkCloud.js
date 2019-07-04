import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { width, height } from 'theme/size';
import color from 'theme/color';

const TalkCloud = props => {
  return (
    <ImageBackground
      source={require('/assets/icons/Cloud.png')}
      style={{
        marginLeft: 30,
        marginRight: 30,
        marginTop: height * 0.12,
        width: width * 0.8,
        height: height * 0.09,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        shadowRadius: 1,
        shadowColor: 'rgb(0, 0, 0.7)',
        shadowOpacity: 0.1,
        shadowOffset: { width: 5, height: 5 },
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      <View stlye={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: '200' }}>
          첫 로그인 시
          {' '}
          <Text style={{ color: color.oboon, fontWeight: 'normal' }}>
            포인트 증정!
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default TalkCloud;
