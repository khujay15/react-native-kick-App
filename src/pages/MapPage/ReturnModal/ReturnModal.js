import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { width, height } from 'theme/size';
import moment from 'moment';
import color from 'theme/color';

import * as s from './ReturnModal.styled';

class ReturnModal extends React.Component {
  state = {
    returnModalVisible: false,
  };

  render() {
    // 대여
    const { rent_station_name } = this.props.returndata;
    const rent_datetime = new Date(this.props.returndata.rent_datetime);
    const rent_minute = rent_datetime.getMinutes();
    const rent_hour = rent_datetime.getHours();

    // 반납
    const { return_station_name } = this.props.returndata;
    const return_datetime = new Date(this.props.returndata.return_datetime);
    const return_minute = return_datetime.getMinutes();
    const return_hour = return_datetime.getHours();

    const dd = return_datetime.getDate();
    const mm = return_datetime.getMonth() + 1;
    const yyyy = return_datetime.getFullYear();

    const usedSec =
      moment(return_datetime, 'YYYY-MM-DDTHH:mm:ssZ').diff(
        moment(rent_datetime, 'YYYY-MM-DDTHH:mm:ssZ'),'seconds'
      ) ;
    const usedMin = Math.floor(usedSec / 60); 

    const { pointToPayFor } = this.props.returndata;
    const { pointBalance } = this.props.returndata;
    const paid = (pointBalance >0);

    return (
      <>
        <Modal
          animationType="slide"
          transparent
          visible={this.props.returnmodal}
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
                height: 500,

                width: width * 0.85,
              }}
            >
              <s.InnerView>
                <Text style={{ fontSize: 20, marginBottom: 12 }}>
                  반납이 완료되었습니다!
                </Text>
                {paid ? null : (
                  <View style={{ flexDirection: 'row' }}>
                    <s.Circle>
                      <Text style={{ color: 'red' }}>!</Text>
                    </s.Circle>
                    <s.UnpaidText>{'  '}보유 포인트가 부족합니다.</s.UnpaidText>
                  </View>
                )}
            <View style={{top: 40}}>
                <Text style={{ fontSize: 20, marginBottom: 25 }}>
                  {`${yyyy}.${mm}.${dd}`}
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <Image source={require('assets/icons/SrcToDst.png')}/>
                  <View>
                <s.LineView>
                
                  <Text style={{ marginRight: 15, fontSize: 16 }}>
                    {`${rent_hour} : ${rent_minute}`}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '300' }}>
                    {rent_station_name}
                  </Text>
                </s.LineView>

                <View style={{ marginLeft: 3, height: 20 }} />

                <s.LineView>
                  <Text style={{ marginRight: 15, fontSize: 16 }}>
                    {`${return_hour} : ${return_minute}`}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '300' }}>
                    {return_station_name}
                  </Text>
                </s.LineView>
                </View>
                </View>

                <s.GrayLine />

                <s.InfoView>
                  <Text style={{ fontSize: 16 }}>총 사용시간</Text>
                  <s.RightText>{`${usedMin}분`}</s.RightText>
                </s.InfoView>

                <s.InfoView>
                  <Text style={{ fontSize: 16 }}>총 결제포인트</Text>
                  <s.TotalCost>
                    {pointToPayFor}
                    {'P'}
                  </s.TotalCost>
                </s.InfoView>
                <s.InfoView>
                  <Text style={{ fontSize: 16 }}>잔여 포인트</Text>
                  <s.RemainPoint paid={paid}>
                    {pointBalance}
                    {'P'}
                  </s.RemainPoint>
                </s.InfoView>
                </View>
              </s.InnerView>
             

              <s.FooterTouch onPress={() => this.props.closemodal()}>
                <Text style={{ color: 'white', fontSize: 20 }}>확인</Text>
              </s.FooterTouch>
            </View>
          </s.DummyView>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  kickboard_serial: state.LentReducer.kickboard_serial,
  point: state.LentReducer.point,
  returnmodal: state.LentReducer.returnmodal,
  returndata: state.LentReducer.returndata,
});

const mapDispatchToProps = dispatch => ({
  closemodal: () => dispatch({ type: 'CLOSE_MODAL' }),
});

const ReturnModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReturnModal);

export default ReturnModalContainer;
