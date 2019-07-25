import React from 'react';

import { networks } from 'components/networks';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DrawHead from 'components/modules/DrawHead';
import MapButton from 'components/modules/MapButton';
import { connect } from 'react-redux';
import PlaceMarker from './PlaceMarker';
import PlaceModal from './PlaceModal';
import LentModal from './LentModal';
import TimerModal from './TimerModal';
import SmartKeyModal from './SmartKeyModal';
import ReturnModal from './ReturnModal';

class MapPage extends React.Component {
  FirstPosition = [];

  ExampleStation = [
    {
      kick_station_id: 1,
      stopped_kickboard_count: 1,
      address: 'random Example address',
      detail_address: null,
      name: 'Example One',
      geometry: 'POINT(37.245221 127.078393)',
      sdistance: 0.10000000000000142,
    },
    {
      kick_station_id: 2,
      stopped_kickboard_count: 2,
      address: 'random Example address',
      detail_address: null,
      name: 'Example Two',
      geometry: 'POINT(37.239881 127.083502)',
      sdistance: 0.10546382072066716,
    },
  ];

  state = {
    MyLocation: 0,
    selectedMarkerId: '',
    latitude: 37.242221,
    longitude: 127.083593,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    Station: [],
    isLent: true,
  };

  componentDidMount() {
    /*
    For Service:
     this.getLocation();
     this.getStation();
     */
    this.setState({ Station: this.ExampleStation });
  }

  getStation() {
    networks
      .get(
        `/search/kick-stations/geonear?lat=${this.state.latitude}&long=${
          this.state.longitude
        }&dist=1`,
      )
      .then(response => {
        if (
          response.data.success === true ||
          response.data.success === 'true'
        ) {
          this.setState({ Station: response.data.data });
          console.log(this.state.Station);
        }
      })
      .catch(err => console.log('STATION ERR: ', err.response));
  }

  getLocation = () => {
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
  };

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
        return false;
      });
      return false;
    }
    return false;
  };

  GeoAPI = () => {
    console.log('GEOAPI');
    Geolocation.watchPosition(
      position => {
        console.log('location: ', position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.FirstPosition.latitude = position.coords.latitude;
        this.FirstPosition.longitude = position.coords.longitude;
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  CurrentButton = () => {
    const Permi = this.getPermission();
    if (Permi) {
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
    const { selectedMarkerId, Station } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          showsUserLocation
          followsUserLocation
          style={{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
            zIndex: 0,
          }}
          region={this.state}
        >
          {Station.map((data, i) => {
            const point = data.geometry.replace(/[A-Z/(/)]/g, '').split(' ');

            return (
              <PlaceMarker
                key={i}
                placeId={i}
                coordinate={{
                  latitude: Number(point[0]),
                  longitude: Number(point[1]),
                }}
                amount={Number(data.stopped_kickboard_count)}
                selectedMarkerId={selectedMarkerId}
                onPress={() => {
                  this.setState({
                    selectedMarkerId: i,
                  });
                }}
              />
            );
          })}
        </MapView>

        {Station.map((data, i) => {
          const point = data.geometry.replace(/[A-Z/(/)]/g, '').split(' ');
          return (
            <PlaceModal
              key={i}
              placeId={i}
              daddr={{
                latitude: Number(point[0]),
                longitude: Number(point[1]),
              }}
              saddr={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              amount={Number(data.stopped_kickboard_count)}
              selectedMarkerId={selectedMarkerId}
              description={data.name}
              location={data.address}
              isLent={this.props.isLent}
            />
          );
        })}

        {this.props.isLent ? (
          <>
            <TimerModal KickboradName="슝슝이" KickboardBattery="60%" />
            <SmartKeyModal />
          </>
        ) : (
          <LentModal navigation={this.props.navigation} />
        )}

        <ReturnModal />

        <MapButton
          right={30}
          bottom={72}
          img={require('assets/icons/buttons/MyLocationButton.png')}
          onPress={() => this.CurrentButton()}
        />

        <MapButton
          right={30}
          bottom={150}
          img={require('assets/icons/RefreshButton.png')}
          onPress={() => {
            this.getLocation();
            this.getStation();
            this.setState({ selectedMarkerId: '-1' });
          }}
        />

        {/* 
          버튼 식 UI Code. UI 변경으로 미사용
          <DrawHead img={require('assets/markers/Drawer.png')} onPress={() => navigation.openDrawer()} />
          <MapButton
            right={30}
            top={25}
            img={require('assets/icons/InfoButton.png')}
            onPress={() => this.props.navigation.navigate('cservice')}
          />
          />
          */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLent: state.LentReducer.isLent,
});

const MapPageContainer = connect(mapStateToProps)(MapPage);

export default MapPageContainer;
