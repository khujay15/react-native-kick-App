import React from 'react';
import { Text, ImageBackground } from 'react-native';
import { Marker } from 'react-native-maps';
import * as s from './PlaceMarker.styled';

export default class PlaceMarker extends React.Component {
  render() {
    return (
      <Marker
        coordinate={this.props.coordinate}
        title={'location'}
        onPress={this.props.onPress}
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
      </Marker>
    );
  }
}
