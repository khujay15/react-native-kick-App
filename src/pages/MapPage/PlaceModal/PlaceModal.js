import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import OboonZone from './OboonZone';
import KickboardSelect from './KickboardSelect';

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

  componentDidMount() {
    console.log(this.props.Kickboard);
  }

  render() {
    if (this.props.placeId !== this.props.selectedMarkerId) return null;
    
      return (
        <s.ModalView>
          <OboonZone
            description="test"
            visible={this.state.MapmodalVisible}
            onPress={() => this.setState({ MapmodalVisible: false })}
            location="용인시 하길동 125"
          />
          <KickboardSelect
            description="test"
            visible={this.state.KickmodalVisible}
            onPress={() => this.setState({ KickmodalVisible: false })}
          />
          {/* 
-------modal out---- */}
          <s.InnerView>
            <TouchableOpacity
              onPress={() => {
                this.setMapModalVisible(true);
              }}
            >
              <s.LocationText> 
                {' '}
                {this.props.description}
                {' '}
              </s.LocationText>
            </TouchableOpacity>
            <s.Line />

            <TouchableOpacity
              onPress={() => {
                this.setKickboardModalVisible(true);
              }}
            >
              <s.LocationText> Kickboard List </s.LocationText>
            </TouchableOpacity>
          </s.InnerView>
        </s.ModalView>
      );
    
  }
}
