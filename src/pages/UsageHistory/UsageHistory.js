import React from 'react';
import { Text, FlatList, SafeAreaView, View, Image,ScrollView } from 'react-native';
import moment from 'moment';
import color from 'theme/color';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import {connect} from 'react-redux';
import {networks} from 'components/networks';
import FoldableView from 'components/modules/FoldableView';
import * as s from './UsageHistory.styled';

class UsageHistory extends React.Component {
  holdFeedUpdate = false;
  preRequestPage = 0;
  preRequestLength = 0;
  state = {
    page: 1,
    history: [],
    preHistoryLength: 0,
  };

  componentWillMount() {
    networks.get('https://api.oboonmobility.com/member/usage_history?page=1')
    .then(res=> {
      console.log(res);
        if(res.data.success==='true'||res.data.success===true)
        {
            this.setState({history: res.data.data})
        }
    })
    .catch(err => console.log(err.response))
  }
  updateHistory = async () => {
    if(!this.holdFeedUpdate){
  
   const requestPage = Math.ceil(this.state.history.length/5+0.1);


   console.log(this.state.history.length);
   await networks.get(`https://api.oboonmobility.com/member/usage_history?page=${requestPage}`)
    .then(res=> {
      console.log("Update:",res);
        if(res.data.success==='true'||res.data.success===true)
        {
          if(this.preRequestLength ===res.data.data.length && requestPage=== this.preRequestPage)
          {
            this.holdFeedUpdate = true;
          }
          else {
            this.preRequestLength=res.data.data.length;
            this.preRequestPage=requestPage;

            const newArr=[...this.state.history, ...res.data.data];

            const uniqueArray = newArr.filter((elem, index, self) => self.findIndex(
              (t) => {return (t.rent_date === elem.rent_date)}) === index);


            // const uniqueArray3 = [...new Set([...this.state.history, ...res.data.data])];

            this.setState({
              history: uniqueArray,
          }); 
          }
           
       
        }
    })
    .catch(err => console.log(err.response))
  }
  
  
  }
  componentWillReceiveProps() {
    this.holdFeedUpdate= false;
   this.updateHistory();
  }

  render() {
    let shadow = {    shadowRadius: 4,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 5 },
      paddingLeft: 20,};

   
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <Arrow onPress={() => this.props.navigation.navigate('mappage')} />
          <ThemeText>이용내역</ThemeText>
         
        <FlatList 
       style={{marginLeft: 24,
        marginRight: 24,
        marginTop: 60,
        marginBottom: 60}}
        data={this.state.history}
        renderItem={({ item }) => {
          const { rent_kick_station_name } = item;
          const rent_datetime = new Date(item.rent_date);
          const rent_minute = rent_datetime.getMinutes();
          const rent_hour = rent_datetime.getHours();
      
          const { return_kick_station_name } = item;
          const return_datetime = new Date(item.return_date);
          const return_minute = return_datetime.getMinutes();
          const return_hour = return_datetime.getHours();
          const usedSec =
            moment(return_datetime, 'YYYY-MM-DDTHH:mm:ssZ').diff(
              moment(rent_datetime, 'YYYY-MM-DDTHH:mm:ssZ'),'seconds'
            ) ;
          const usedMin = Math.floor(usedSec / 60); 
      
          const { usage_point } = item;
          const dd = return_datetime.getDate();
          const mm = return_datetime.getMonth() + 1;
          const yyyy = return_datetime.getFullYear();
       
            return (
              <FoldableView title={`${yyyy}.${mm}.${dd}`}>
              <s.InnerView style={shadow}>
          <View>
              {/* <Text style={{ fontSize: 20, marginBottom: 25 }}>
                {`${yyyy}.${mm}.${dd}`}
              </Text> */}

              <View style={{flexDirection: 'row'}}>
                <Image source={require('assets/icons/SrcToDst.png')}/>
                <View>
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

              <s.GrayLine />

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
            </FoldableView>
                )}}
        keyExtractor={(i, index) => index.toString()}
        onEndReached={this.updateHistory}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        
      />
        </SafeAreaView>
     
      </>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Email: state.LoginReducer.Email,
  Token: state.LoginReducer.Token,
  Tutorial: state.LoginReducer.Tutorial,
  License: state.LoginReducer.License,
  Phone: state.LoginReducer.Phone,
  Status: state.LoginReducer.Status,
  point: state.LentReducer.point,
  kickboard_serial : state.LentReducer.kickboard_serial,
  preSecond: state.LentReducer.preSecond,
});

const mapDispatchToProps = dispatch => ({
  updatePoint: (LeftPoint) => dispatch({type: 'UPDATE_POINT', point: LeftPoint}),
});

const PointContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsageHistory);

export default PointContainer;