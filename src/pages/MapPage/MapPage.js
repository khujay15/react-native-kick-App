import React from 'react';
import axios from 'axios';
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

export default class MapPage extends React.Component {
  state = {
    MyLocation: 1,
    selectedMarkerId: '',
    latitude: 37.245221,
    longitude: 127.078393,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,

   
    Station: [],

  

    isLent: false,
  };

  componentDidMount() {
    this.getLocation();
    this.getStation();
  }
  
  getStation() {
    axios
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
      if(response['data']['success'])
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
        }
      });
    } else {
      console.log('permission granted');
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
    }
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
            {/* <PlaceMarker
              key={1}
              coordinate={{ latitude: 37.49, longitude: 127.127 }}
              amount={1}
              selectedMarkerId={selectedMarkerId}
              onPress={() =>
                this.setState({
                  selectedMarkerId: 1,
                  latitude: 37.49,
                  longitude: 127.127,
                })
              }
            />
            <PlaceMarker
              key={2}
              coordinate={{ latitude: 37.49, longitude: 127.125 }}
              amount={2}
              selectedMarkerId={selectedMarkerId}
              onPress={() =>
                this.setState({
                  selectedMarkerId: 2,
                  latitude: 37.49,
                  longitude: 127.125,
                })
              }
            /> */}
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
          {this.state.isLent && (
            <TimerModal KickboradName="슝슝이" KickboardBattery="60%" />
          )}

          {/* <PlaceModal
            description="경희대 체대"
            location="용인시 하길동 125"
            placeId={1}
            selectedMarkerId={selectedMarkerId}
            amount={3}
          />
          <PlaceModal
            description="경희대 외대"
            location="용인시 하길동 125"
            placeId={2}
            selectedMarkerId={selectedMarkerId}
            amount={2}
          /> */}

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

          {/* <PayModal />
          <LicenseModal /> */}
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
            onPress={() => this.setState({ MyLocation: 1 })}
          />
          <MapButton
            right={30}
            bottom={180}
            img={require('assets/icons/RefreshButton.png')}
            onPress={() => {
              this.getLocation();
               this.getStation();
              this.setState({selectedMarkerId: '-1'})}}
          />
          {this.state.isLent ? <SmartKeyModal /> : <LentModal />}
        </SafeAreaView>
      </>
    );
  }
}
