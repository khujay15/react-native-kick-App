import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import {SHADOW} from 'theme/shadow';

import * as s from './PlaceModal.styled';

export default class PlaceModal extends React.Component {
  state = {
    MapmodalVisible: false,
    KickmodalVisible: false,
  };

  setMapModalVisible(visible) {
    this.setState({ MapmodalVisible: visible });
  }

  setKickboardModalVisible(visible) {
    this.setState({ KickmodalVisible: visible });
  }

  componentDidMount() {}

  render() {
    if (this.props.placeId !== this.props.selectedMarkerId) return null;

    return (
      <s.ModalView
        style={SHADOW.iosSmall}
        isLent={this.props.isLent}
      >
        <s.InnerView>
          {this.props.isLent ? (
            <>
              <Image
                source={require('assets/markers/ParkMark.png')}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <TouchableOpacity >
                <s.LocationText>{this.props.description}</s.LocationText>
                <s.LocationTextDetail>
                  {this.props.location}
                </s.LocationTextDetail>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image
                source={require('assets/icons/PlaceModal.png')}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <TouchableOpacity>
                <s.LocationText>{this.props.description}</s.LocationText>
                <s.LocationTextDetail>
                  {this.props.location}
                </s.LocationTextDetail>
              </TouchableOpacity>
              <s.NumberView>
                <s.NumberText>
                  {this.props.amount}
대
                  <Text style={{ color: 'black' }}> 이용가능</Text>
                </s.NumberText>
              </s.NumberView>
            </>
          )}

          {/* <s.Line /> */}
        </s.InnerView>
      </s.ModalView>
    );
  }
}
