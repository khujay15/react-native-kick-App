import React from 'react';
import { Text, View, ScrollView, ImageBackground } from 'react-native';
import color from '/theme/color';
import { connect } from 'react-redux';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';

import * as s from './MyCard.styled';

class MyCard extends React.Component {
  state = {
    hasPayment: true,
  };

  render() {
    return (
      <DefaultArrowPage
        arrowOnPress={() => this.props.navigation.goBack()}
        themeText="지불 정보"
        footerText="등록하기"
        footerColor={color.oboon}
        footerOnPress={() => this.props.navigation.navigate('newcard')}
      >
        <View style={{ marginHorizontal: 30 }}>
          <ImageBackground
            source={require('assets/icons/MyCard.png')}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: 180,
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
      </DefaultArrowPage>
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
