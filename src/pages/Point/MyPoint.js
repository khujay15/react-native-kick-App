import React from 'react';
import { Text, FlatList, SafeAreaView, View, Image,ScrollView } from 'react-native';

import color from 'theme/color';
import InputBox from 'components/modules/InputBox';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';
import moment from 'moment';
import {connect} from 'react-redux';
import {networks} from 'components/networks';
import * as s from './Coupon.styled';

class MyPoint extends React.Component {
  holdFeedUpdate = false;
  preRequestPage = 0;
  preRequestLength = 0;
  state = {
    page: 1,
    history: [
      {
          "point_usage_datetime": "2019-06-30T15:51:45.000Z",
          "usage_type": "example Data",
          "usage_point": -5400
      },
      {
          "point_usage_datetime": "2019-06-30T14:57:31.000Z",
          "usage_type": "example Data",
          "usage_point": 100000
      }
    ],
    preHistoryLength: 0,
    ErrorText: false,
  };

  componentWillMount() {
    this.FirstPage();
  }
  componentWillReceiveProps() {
    this.holdFeedUpdate= false;
    this.FirstPage();
  }


  FirstPage = () => {
  
  networks.get('https://api.oboonmobility.com/v0/members/my/point-history?page=1')
    .then(res=> {
      console.log("FirstPage:",res);
        if(res.data.success==='true'||res.data.success===true)
        {
            this.setState({history: res.data.data})
            console.log("FirstPage: ",res.data.data);
        }
    })
    .catch(err => {
      console.log(err.response);
      this.setState({histroy: historyExample});
      this.setState({ErrorText: err.response.data.msg})
  })
}
  updateHistory = async () => {
    if(!this.holdFeedUpdate){
  
   const requestPage = Math.ceil(this.state.history.length/5+0.1);
   const head = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
   console.log(this.state.history.length);
   await networks.get(`https://api.oboonmobility.com/v0/members/my/point-history?page=${requestPage}`,head)
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
              (t) => {return (t.point_usage_datetime === elem.point_usage_datetime)}) === index);


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
  
  render() {    
    return (
      <>
        
          <DefaultArrowPage
          arrowOnPress={() => this.props.navigation.navigate('DrawerContainer')}
          themeText="내 포인트"
        >

        
          <s.MyPointView>
            <s.InnerText>현재 보유 포인트</s.InnerText>
            <s.PointTouch onPress={()=> this.props.navigation.navigate('pointpage')}>
                <s.PointText>{this.props.point}P</s.PointText>
                <s.InView>
                <Text>충전하기</Text>
                <Image style={{marginLeft: 10}} source={require('/assets/icons/NavImage.png')} />
                </s.InView>
            </s.PointTouch>
            <s.Line />
            </s.MyPointView>
            {/* {this.state.ErrorText && <Text>{this.state.ErrorText}</Text>} */}
       
        <FlatList 
       style={{marginLeft: 24,
        marginRight: 24,
        marginBottom: 60}}
        data={this.state.history}
        renderItem={({ item }) => {
            const date = new Date(item.point_usage_datetime);
            
            const YYYYMMDD = moment(date).format('YYYY-MM-DD HH:mm'); 
            return (
                    <View style={{marginBottom: 20}}>
                    {/* <Text style={{color: color.grey, fontSize: 14}}>{`${YYYY}.${MM}.${DD} ${hh}:${mm}`}</Text> */}
                    <Text style={{color: color.grey, fontSize: 14}}>{YYYYMMDD}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16}}>{item.usage_type}</Text>
                        <s.InPointText>{item.usage_point} </s.InPointText>
                    </View>
                    </View>
                )}}
        keyExtractor={(i, index) => index.toString()}
        onEndReached={this.updateHistory}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
       
        
      />
      </DefaultArrowPage>
    
     
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
)(MyPoint);

export default PointContainer;