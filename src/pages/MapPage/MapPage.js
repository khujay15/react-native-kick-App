import React from 'react';

import {networks} from 'components/networks';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Button,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DrawHead from 'components/modules/DrawHead';
import MapButton from 'components/modules/MapButton';
import PlaceMarker from './PlaceMarker';
import PlaceModal from './PlaceModal';
import LentModal from './LentModal';
import TimerModal from './TimerModal';
import SmartKeyModal from './SmartKeyModal';
import ReturnModal from './ReturnModal';
import {connect} from 'react-redux';


class MapPage extends React.Component {

  static navigationOptions = ({ navigation }) => {
   
    header: (
      <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
        <TouchableOpacity onPress={() => navigation.navigate('DrawerContainer')}>
        <Text>draw</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MapPage')}>
        <Text>map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('cservice')}>
        <Text>cservice</Text>
      </TouchableOpacity>
      </View>
    )
  
  };


  FirstPosition =[];
  state = {
    MyLocation: 0,
    selectedMarkerId: '',
    latitude: 37.245221,
    longitude: 127.078393,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    Station: [],
    isLent: true,
  };

  componentDidMount() {
    this.getLocation();
    this.getStation();
 
  }
  
  
  
// {
//   params: { // query string
//     lat: this.state.latitude,
//     long: this.state.longitude,
//     dist: 1
//   },
// }
  getStation() {
    networks
    .get(
      `https://api.oboonmobility.com/v0/search/kick-stations/geonear?lat=${this.state.latitude}&long=${this.state.longitude}&dist=1`
      
    )
    .then(response => {
      if(response['data']['success']=== true || response['data']['success']=== 'true')
      {
        this.setState({ Station: response['data']['data'] });
        console.log(this.state.Station);

      }
     
    
    })
    .catch(err => console.log("STATION ERR: ", err.response))


  }

  getLocation =  () => {
  if (Platform.OS === 'ios') this.GeoAPI();
  if (Platform.Version < 23) this.GeoAPI();
  if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
       PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
     ]).then(response => {
       if (
         response['android.permission.ACCESS_FINE_LOCATION'] ===
           PermissionsAndroid.RESULTS.GRANTED &&
         response['android.permission.ACCESS_COARSE_LOCATION'] ===
           PermissionsAndroid.RESULTS.GRANTED
       ) {
        this.GeoAPI();
       }
     });
  }
  }
  getPermission = async () => {
  if (Platform.OS === 'ios') return true;
  if (Platform.Version < 23) return true;
  if (Platform.OS === 'android') {
     await PermissionsAndroid.requestMultiple([
       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
       PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
     ]).then(response => {
      
       if (
         response['android.permission.ACCESS_FINE_LOCATION'] ===
           PermissionsAndroid.RESULTS.GRANTED &&
         response['android.permission.ACCESS_COARSE_LOCATION'] ===
           PermissionsAndroid.RESULTS.GRANTED
       ) {
       
         return true;
       }
       else 
       {
         return false;
       }
      
     })
     return false;
  }

  return false

  
}

  GeoAPI = () => {
    console.log('GEOAPI');
    Geolocation.watchPosition(
      position => {
        console.log("location: ",position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.FirstPosition['latitude']=position.coords.latitude;
        this.FirstPosition['longitude']=position.coords.longitude;
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )

  }

  CurrentButton = () => {
    const Permi = this.getPermission();
    if(Permi) {
    Geolocation.getCurrentPosition(
      position => {
        console.log('get position: ', position.coords);
        
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }
  };

  render() {
    const { selectedMarkerId, Kickboard } = this.state;
    const { navigation } = this.props;
    const dummy = navigation.getParam('dummy', '0');
    return (
      <View style={{flex:1}}>
          <MapView
            showsUserLocation
            followsUserLocation
           style={{ left:0, top:0, right:0, bottom: 0, position: 'absolute', zIndex:0}}
            region={this.state}
          >
            
            {
              this.state.Station.map((data,i) => {
              
                const point = data['geometry'].replace(/[A-Z/(/)]/g,"").split(' ');
             
              return (
                <PlaceMarker 
                key={i}
                placeId={i} 
                coordinate={{latitude: Number(point[0]), longitude: Number(point[1])}}
                 amount={ Number(data['stopped_kickboard_count'])}
                 selectedMarkerId={selectedMarkerId}
                 onPress={() =>{
                  this.setState({
                    latitude: Number(point[0]), 
                    longitude: Number(point[1]),
                    selectedMarkerId: i,
                  
                  })}
                }
                 />
              )
            })}
          </MapView>
          {this.props.isLent && (
            <TimerModal KickboradName="슝슝이" KickboardBattery="60%" />
          )}

            {
              this.state.Station.map((data,i) => {
               
              return (
                <PlaceModal 
               key={i}
                placeId={i} 
                 amount={ Number(data['stopped_kickboard_count'])}
                 selectedMarkerId={selectedMarkerId}
                description={data['name']}
                location={data['address']}
                isLent={this.props.isLent}
                 />
              )
            })}

         
          <DrawHead img={require('assets/markers/Drawer.png')} onPress={() => navigation.openDrawer()} />
          <MapButton
            right={30}
            top={25}
            img={require('assets/icons/InfoButton.png')}
            onPress={() => this.props.navigation.navigate('cservice')}
          />
          <MapButton
            right={30}
            bottom={72}
            img={require('assets/icons/buttons/MyLocationButton.png')}
            onPress={() =>this.CurrentButton()}
          />
          <MapButton
            right={30}
            bottom={150}
            img={require('assets/icons/RefreshButton.png')}
            onPress={() => {
              this.getLocation();
               this.getStation();
              this.setState({selectedMarkerId: '-1'})}}
          />
          <ReturnModal />
          {this.props.isLent ? <SmartKeyModal /> : <LentModal navigation={this.props.navigation}/>}
        
        </View>
    );
  }
}

const mapStateToProps = state => ({
 
  isLent: state.LentReducer.isLent,
});

const MapPageContainer = connect(
  mapStateToProps,
)(MapPage);

export default MapPageContainer;