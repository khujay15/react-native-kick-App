import React from 'react';

import {networks} from 'components/networks';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
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
  


  getStation() {
    networks
    .get(
      'https://api.oboonmobility.com/search/kick_station/geonear',{
        params: { // query string
          lat: this.state.latitude,
          long: this.state.longitude,
          dist: 1
        },
      }
      
    )
    .then(response => {
      if(response['data']['success']=== true || response['data']['success']=== 'true')
      {
        this.setState({ Station: response['data']['data'] });
        console.log(this.state.Station);

      }
    
    });


  }

  getLocation() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]).then(response => {
        console.log('response: ', response);
        if (
          response['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          response['android.permission.ACCESS_COARSE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permission granted');
          this.GeoAPI();
        }
      });
    } else {
      console.log('permission granted');
      this.GeoAPI();
    }
  }

  GeoAPI = () => {
    Geolocation.watchPosition(
      position => {
        console.log(position);
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
    Geolocation.watchPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  render() {
    const { selectedMarkerId, Kickboard } = this.state;
    const { navigation } = this.props;

    return (
      <>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <MapView
            showsUserLocation
            followsUserLocation
            style={StyleSheet.absoluteFillObject}
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
                 />
              )
            })}

         
          <DrawHead onPress={() => navigation.openDrawer()} />
          <MapButton
            right={30}
            top={25}
            img={require('assets/icons/InfoButton.png')}
          />
          <MapButton
            right={30}
            bottom={90}
            img={require('assets/icons/MyLocationButton.png')}
            onPress={() => this.setState({ latitude: this.FirstPosition['latitude'], 
              longitude: this.FirstPosition['longitude'] })}
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
        </SafeAreaView>
      </>
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