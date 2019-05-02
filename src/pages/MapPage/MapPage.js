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
import DrawHead from 'components/modules/DrawHead';
import PlaceMarker from './PlaceMarker';
import PlaceModal from './PlaceModal';

export default class MapPage extends React.Component {
  state = {
    selectedMarkerId: 1,
    latitude: 37.78825,
    longitude: 122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,

    parkingVisiable: false,
    parking: [
      {
        description: '경희대 외대 앞 정류장',
        amount: '4',
        kickboardDetail: '',
      },
      {
        description: '경희대 체대 ',
        amount: '9',
        kickboardDetail: '',
      },
    ],
    Kickboard: [
      {
        name: 'test',
        uuid: 'aaaaaa-aaaaaa-aaaaaa-aaaa',
      },
    ],
  };

  componentDidMount() {
    // Instead of navigator.geolocation, just use Geolocation.
    this.getLocation();
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
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }

  clickHandler = id => {};

  render() {
    const { selectedMarkerId, Kickboard } = this.state;
    const { navigation } = this.props;

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
              coordinate={{ latitude: 37.49, longitude: 127.127 }}
              number={1}
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
              coordinate={{ latitude: 37.49, longitude: 127.125 }}
              number={2}
              selectedMarkerId={selectedMarkerId}
              onPress={() =>
                this.setState({
                  selectedMarkerId: 2,
                  latitude: 37.49,
                  longitude: 127.125,
                })
              }
            />
          </MapView>
          <PlaceModal
            description="경희대 체대"
            placeId={1}
            selectedMarkerId={selectedMarkerId}
            Kickboard={Kickboard[0]}
          />
          <PlaceModal
            description="경희대 외대"
            placeId={2}
            selectedMarkerId={selectedMarkerId}
            Kickboard={Kickboard[0]}
          />
        </SafeAreaView>

        <DrawHead onPress={() => navigation.openDrawer()} />
      </>
    );
  }
}
