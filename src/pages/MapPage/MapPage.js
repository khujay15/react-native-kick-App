import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DrawHead from '/components/modules/DrawHead';
import PlaceMarker from './PlaceMarker';
export default class MapPage extends React.Component {
  state = {
    selectedMarkerId: 1,
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,

    parkingVisiable: false,
    parking: [
      {
        latitude: 37.498183,
        longitude: 127.127368,
      },
      {
        latitude: 37.498183,
        longitude: 127.227368,
      },
      {
        latitude: 37.498183,
        longitude: 127.327368,
      },
    ],
  };

  _getLocation() {
    if (Platform.OS == 'android') {
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
              console.log(this.state);
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
          console.log(this.state);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }
  componentDidMount() {
    // Instead of navigator.geolocation, just use Geolocation.
    this._getLocation();
  }

  render() {
    return (
      <>
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <MapView
            showsUserLocation
            followsUserLocation
            style={StyleSheet.absoluteFillObject}
            region={this.state}
          >
            <PlaceMarker
              coordinate={{ latitude: 37.49, longitude: 127.125 }}
              number={2}
              selectedMarkerId={this.state.selectedMarkerId}
              onPress={() => this.setState({ selectedMarkerId: 2 })}
            />

            <PlaceMarker
              coordinate={{ latitude: 37.49, longitude: 127.127 }}
              number={1}
              selectedMarkerId={this.state.selectedMarkerId}
              onPress={() => this.setState({ selectedMarkerId: 1 })}
            />
          </MapView>
        </SafeAreaView>

        <DrawHead onPress={() => this.props.navigation.openDrawer()} />
      </>
    );
  }
}
