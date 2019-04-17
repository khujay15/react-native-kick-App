import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class MapPage extends React.Component {
  render() {
    return (
      <MapView
        showsUserLocation
        followsUserLocation
        style={StyleSheet.absoluteFillObject}
      />
    );
  }
}
