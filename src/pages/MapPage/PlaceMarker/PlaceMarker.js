import React from 'react';
import { Text, ImageBackground, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

import * as s from './PlaceMarker.styled';

class PlaceMarker extends React.Component {
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
        {this.props.isLent ? (
          <s.MarkerImage
            source={
              this.props.selectedMarkerId === this.props.placeId
                ? require('assets/markers/ParkingLot.png')
                : require('assets/markers/SelectedParkingLot.png')
            }
          />
        ) : (
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
        )}
      </MapView.Marker>
    );
  }
}

const mapStateToProps = state => ({
  isLent: state.LentReducer.isLent,
});

const PlaceMarkerContainer = connect(mapStateToProps)(PlaceMarker);

export default PlaceMarkerContainer;
