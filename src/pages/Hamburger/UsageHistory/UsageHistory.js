import React from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  SectionList,
  Platform,
} from 'react-native';
import moment from 'moment';
import color from 'theme/color';
import { width, height, MARGIN } from 'theme/size';
import { SHADOW } from 'theme/shadow';
import { BoxShadow } from 'react-native-shadow';

import DefaultArrowPage from 'components/modules/DefaultArrowPage';
import ThemeText from 'components/modules/ThemeText';
import { connect } from 'react-redux';
import { networks } from 'components/networks';
import * as s from './UsageHistory.styled';

export default class UsageHistory extends React.Component {
  holdFeedUpdate = false;

  preDate = 'NO-DATE';

  preRequestPage = 0;

  preRequestLength = 0;

  state = {
    page: 1,
    //example History
    history: [{"rent_date":"2019-06-02T17:32:30.000Z","rent_kick_station_name":"EXAMPLE","return_date":"2019-06-02T17:32:35.000Z","return_kick_station_name":"EXAMPLE","usage_point":-500,"status":1},{"rent_date":"2019-06-01T15:43:54.000Z","rent_kick_station_name":"EXAMPLE","return_date":"2019-06-01T15:43:57.000Z","return_kick_station_name":"EXAMPLE","usage_point":-500,"status":1},{"rent_date":"2019-06-01T15:42:27.000Z","rent_kick_station_name":"EXAMPLE","return_date":"2019-06-01T15:42:29.000Z","return_kick_station_name":"EXAMPLE","usage_point":-500,"status":1},{"rent_date":"2019-06-01T15:41:24.000Z","rent_kick_station_name":"EXAMPLE","return_date":"2019-06-01T15:41:26.000Z","return_kick_station_name":"EXAMPLE","usage_point":-500,"status":1},{"rent_date":"2019-06-01T15:37:59.000Z","rent_kick_station_name":"EXAMPLE","return_date":"2019-06-01T15:38:03.000Z","return_kick_station_name":"EXAMPLE","usage_point":-500,"status":1}],
    changedHistory: [],
    DateArray: [],
  };

  componentWillMount() {
    this.FirstPage();
  }

  rebuildingArray = () => {
    const tmpArr = [];
    const datearr = [];
    console.log(this.state.history.length);
    for (let i = 0; i < this.state.history.length; i++) {
      const date = moment(this.state.history[i].rent_date).format('YYYY-MM-DD');
      if (tmpArr[date]) {
        tmpArr[date] = tmpArr.concat(...tmpArr[date], this.state.history[i]);
      } else {
        datearr.push(date);
        tmpArr[date] = tmpArr.concat(this.state.history[i]);
      }
    }
    this.setState({ changedHistory: tmpArr, DateArray: datearr });
    console.log('DateArray:', this.state.DateArray);
    console.log('changedHistory:', this.state.changedHistory);
  };

  FirstPage = () => {
    networks
      .get('/members/my/usage-history?page=1')
      .then(res => {
        if (res.data.success === 'true' || res.data.success === true) {
          this.setState({ history: res.data.data });
        }
      })
      .catch(err => console.log(err.response));
  };

  updateHistory = async () => {
    if (!this.holdFeedUpdate) {
      this.holdFeedUpdate = true;
      const requestPage = Math.ceil(this.state.history.length / 5 + 0.1);

      console.log(this.state.history.length);
      await networks
        .get(
          `/members/my/usage-history?page=${requestPage}`,
        )
        .then(res => {
          // console.log("Update:",res);
          if (res.data.success === 'true' || res.data.success === true) {
            if (
              this.preRequestLength === res.data.data.length &&
              requestPage === this.preRequestPage
            ) {
              this.holdFeedUpdate = true;
            } else {
              this.preRequestLength = res.data.data.length;
              this.preRequestPage = requestPage;

              const newArr = [...this.state.history, ...res.data.data];

              const uniqueArray = newArr.filter(
                (elem, index, self) =>
                  self.findIndex(t => {
                    return t.rent_date === elem.rent_date;
                  }) === index,
              );

              this.setState({
                history: uniqueArray,
              });
              this.holdFeedUpdate = false;
              console.log('history: ', this.state.history);
              // this.rebuildingArray();
            }
          }
        })
        .catch(err => console.log(err.response));
    }
  };

  componentWillReceiveProps() {
    this.holdFeedUpdate = false;
    preDate = 'NO-DATE';
    this.FirstPage();
  }

  renderItems = item => {
    const { rent_kick_station_name } = item;
    const rent_datetime = new Date(item.rent_date);
    const rent_minute = rent_datetime.getMinutes();
    const rent_hour = rent_datetime.getHours();

    const { return_kick_station_name } = item;
    const return_datetime = new Date(item.return_date);
    const return_minute = return_datetime.getMinutes();
    const return_hour = return_datetime.getHours();
    const usedSec = moment(return_datetime, 'YYYY-MM-DDTHH:mm:ssZ').diff(
      moment(rent_datetime, 'YYYY-MM-DDTHH:mm:ssZ'),
      'seconds',
    );
    const usedMin = Math.floor(usedSec / 60);
    const { usage_point } = item;
    const dd = return_datetime.getDate();
    const mm = return_datetime.getMonth() + 1;
    const yyyy = return_datetime.getFullYear();
    const YYYYMMDD = `${yyyy}.${mm}.${dd}`;
    let newdate = false;

    if (this.preDate !== YYYYMMDD || this.preDate === 'NO-DATE') {
      newdate = true;
      this.preDate = YYYYMMDD;
    }

   
      return (
        <>
          {newdate && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 30,
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 20 }}>{YYYYMMDD}</Text>
                <s.GrayLine />
              </View>
            </>
          )}
          <s.OuterView style={SHADOW.iosSmall}>
            <s.InnerView>
              <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('assets/icons/SrcToDst.png')}
                    style={{ marginRight: 10, marginTop: 3 }}
                  />
                  <View style={{ marginBottom: 20 }}>
                    <s.LineView>
                      <Text style={{ marginRight: 15, fontSize: 16 }}>
                        {`${rent_hour} : ${rent_minute}`}
                      </Text>
                      <Text style={{ fontSize: 16, fontWeight: '300' }}>
                        {rent_kick_station_name}
                      </Text>
                    </s.LineView>
                    <View style={{ marginLeft: 3, height: 20 }} />
                    <s.LineView>
                      <Text style={{ marginRight: 15, fontSize: 16 }}>
                        {`${return_hour} : ${return_minute}`}
                      </Text>
                      <Text style={{ fontSize: 16, fontWeight: '300' }}>
                        {return_kick_station_name}
                      </Text>
                    </s.LineView>
                  </View>
                </View>
                <s.InfoView>
                  <Text style={{ fontSize: 16 }}>총 사용시간</Text>
                  <s.RightText>{`${usedMin}분`}</s.RightText>
                </s.InfoView>

                <s.InfoView>
                  <Text style={{ fontSize: 16 }}>총 결제포인트</Text>
                  <s.TotalCost>
                    {usage_point}
                    {'P'}
                  </s.TotalCost>
                </s.InfoView>
              </View>
            </s.InnerView>
          </s.OuterView>
        </>
      );
    
  };

  render() {
    return (
      <>
        <DefaultArrowPage
          arrowOnPress={() => this.props.navigation.goBack()}
          themeText="이용내역"
        >
          <FlatList
            style={{ marginBottom: 20 }}
            data={this.state.history}
            extraData={this.state}
            renderItem={({ item }) => this.renderItems(item)}
            keyExtractor={item => item.return_date}
            onEndReached={this.updateHistory}
            onEndReachedThreshold={0.5}
            initialNumToRender={5}
          />
        </DefaultArrowPage>
      </>
    );
  }
}

