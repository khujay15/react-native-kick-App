import React from 'react';
import { Text, View, ScrollView, ImageBackground } from 'react-native';
import Arrow from '/components/modules/Arrow';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import { connect } from 'react-redux';
import FooterClick from 'components/modules/FooterClick';
import * as s from './MyCard.styled';

class MyCard extends React.Component {
  state = {
    hasPayment: true,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Arrow onPress={() => this.props.navigation.goBack()} />
        <ThemeText>지불정보</ThemeText>

        <View
          style={{
            marginHorizontal: 24,
            flex: 1,
          }}
        >
          <ImageBackground
            source={require('assets/icons/MyCard.png')}
            style={{
              resizeMode: 'contain',
              marginTop: 60,
              width: '100%',
            }}
            imageStyle={{ borderRadius: 5 }}
          >
            <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
              {this.props.Payment ? (
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white' }}>국민은행</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 45,
                      marginBottom: 20,
                    }}
                  >
                    <s.Dotindicator />
                    <s.Dotindicator />
                    <s.Dotindicator />
                    <s.Dotindicator style={{ marginRight: 25 }} />
                    <s.Dotindicator />
                    <s.Dotindicator />
                    <s.Dotindicator />
                    <s.Dotindicator style={{ marginRight: 25 }} />
                    <s.Dotindicator />
                    <s.Dotindicator />
                    <s.Dotindicator />
                    <s.Dotindicator style={{ marginRight: 25 }} />
                    <s.Dotindicator />
                    <s.Dotindicator />
                    <s.Dotindicator />
                    <s.Dotindicator style={{ marginRight: 25 }} />
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                    <Text style={{ color: 'white' }}>이름 </Text>
                    <Text style={{ marginLeft: 'auto', color: 'white' }}>
                      만료일
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white' }}>가나다</Text>
                    <Text style={{ marginLeft: 'auto', color: 'white' }}>
                      11/16
                    </Text>
                  </View>
                </View>
              ) : (
                <>
                  <Text style={{ color: 'white' }}>지불 정보가 없습니다</Text>
                  <Text style={{ color: 'white' }}>
                    지불 정보를 등록해주세요!
                  </Text>
                </>
              )}
            </View>
          </ImageBackground>

          <s.Line />
          <ScrollView>
            <s.StyledBox
              style={{
                shadowRadius: 4,
                shadowColor: 'rgb(0, 0, 0.7)',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: 5 },
                paddingLeft: 20,
              }}
            >
              <Text style={{ color: color.grey }}>등록된 카드가 없습니다.</Text>
            </s.StyledBox>
          </ScrollView>
        </View>
        <FooterClick
          color={color.oboon}
          onPress={() => this.props.navigation.navigate('pay')}
          text="등록하기"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  Payment: state.LoginReducer.Payment,
});

const mapDispatchToProps = dispatch => ({
  hasPayment: () => dispatch({ type: 'PAYMENT' }),
});

const MyCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyCard);

export default MyCardContainer;
