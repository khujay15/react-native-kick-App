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
        title={'location'}
        onPress={this.pressHandler}
      >
        <s.MarkerImage
          source={
            this.props.selectedMarkerId === this.props.number
              ? require('assets/markers/SelectedMarker.png')
              : require('assets/markers/Marker.png')
          }
        >
          <s.MarkerText
            select={this.props.selectedMarkerId === this.props.number}
          >
            {this.props.number}
          </s.MarkerText>
        </s.MarkerImage>
      </MapView.Marker>
    );
  }
}
