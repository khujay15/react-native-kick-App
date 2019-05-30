import React from 'react';
import { Text, FlatList, SafeAreaView, View, Image,ScrollView } from 'react-native';

import color from 'theme/color';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import {connect} from 'react-redux';
import {networks} from 'components/networks';
import * as s from './Coupon.styled';


class Point extends React.Component {

  state = {
    page: 1,
    history: [],
  };

  componentWillMount() {
    networks.get('https://api.oboonmobility.com/member/point_history?page=1')
    .then(res=> {
        if(res.data.success==='true'||res.data.success===true)
        {
            this.setState({history: res.data.data})
        }
    })
    .catch(err => console.log(err.response))
  }
  updateHistory = async () => {
   
    this.setState((prevState, props) => ({
        page: prevState.page + 1
    })); 
   await networks.get(`https://api.oboonmobility.com/member/point_history?page=${this.state.page}`)
    .then(res=> {
        console.log("hitory!:res");
        if(res.data.success==='true'||res.data.success===true)
        {
            this.setState({
                history: [...this.state.history, ...res.data.data],
            }); 

        }
    })
    .catch(err => console.log(err.response))

    
  }
  componentWillReceiveProps() {

   this.updateHistory();
  }

  render() {
    let shadowStyle = {
      shadowRadius: 4,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 5 },
    };
    
    let selectedShadow = {...shadowStyle,backgroundColor: color.oboon};
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <Arrow onPress={() => this.props.navigation.navigate('mappage')} />
          <ThemeText>내 포인트</ThemeText>
          <s.CouponView>
            <s.InnerText>현재 보유 포인트</s.InnerText>
            <s.PointTouch onPress={()=> this.props.navigation.navigate('pointpage')}>
                <s.PointText>{this.props.point}P</s.PointText>
                <s.InView>
                <Text>충전하기</Text>
                <Image style={{marginLeft: 10}} source={require('/assets/icons/NavImage.png')} />
                </s.InView>
            </s.PointTouch>
            <s.Line />
            </s.CouponView>
       
        <FlatList 
       style={{marginLeft: 24,
        marginRight: 24,
        marginBottom: 60}}
        data={this.state.history}
        renderItem={({ item }) => {
            const date = new Date(item.point_usage_datetime);
            const YYYY = date.getFullYear();
            const MM = date.getMonth();
            const DD = date.getDay();
            const hh = date.getHours();
            const mm = date.getMinutes();
            return (
                    <View style={{marginBottom: 20}}>
                    <Text style={{color: color.grey, fontSize: 14}}>{`${YYYY}.${MM}.${DD} ${hh}:${mm}`}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16}}>{item.usage_type}</Text>
                        <s.InPointText>{item.usage_point} </s.InPointText>
                    </View>
                    </View>
                )}}
        keyExtractor={(i, index) => index.toString()}
        onEndReached={this.updateHistory}
        onEndReachedThreshold={0}
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
)(Point);

export default PointContainer;