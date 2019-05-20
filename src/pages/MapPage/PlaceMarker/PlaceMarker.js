import React from 'react';
import { Text, ImageBackground, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as s from './PlaceMarker.styled';

export default class PlaceMarker extends React.Component {
  pressHandler = () => {
    this.props.onPress();
    console.log('clicked');
  };

  render() {
    return (
      <MapView.Marker
        coordinate={this.props.coordinate}
        onPress={this.pressHandler}
      >
        <s.MarkerImage
          source={
            this.props.selectedMarkerId === this.props.placeId
              ? require('assets/markers/SelectedMarker.png')
              : require('assets/markers/OboonMarker.png')
          }
        >
          <View style={{ marginBottom: 10 }}>
            {this.props.selectedMarkerId === this.props.placeId && (
              <s.MarkerText>{this.props.amount}</s.MarkerText>
            )}
          </View>
        </s.MarkerImage>
      </MapView.Marker>
    );
  }
}
