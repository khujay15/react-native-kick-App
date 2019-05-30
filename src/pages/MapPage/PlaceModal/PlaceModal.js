import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import { AUTO_LOGIN } from 'store/action';
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

  componentDidMount() {}

  render() {
    if (this.props.placeId !== this.props.selectedMarkerId) return null;

    return (
      <s.ModalView
        style={{
          shadowRadius: 3,
          shadowColor: 'rgb(0, 0, 0.7)',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 5 },
        }}
      >
        <OboonZone
          description="test"
          visible={this.state.MapmodalVisible}
          onPress={() => this.setState({ MapmodalVisible: false })}
          location="용인시 하길동 125"
        />

        {/* 
-------modal out---- */}
        <s.InnerView style={{ flexDirection: 'row' }}>
          <Image
            source={require('assets/icons/PlaceModal.png')}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <TouchableOpacity>
            <s.LocationText>{this.props.description}</s.LocationText>
            <s.LocationTextDetail>{this.props.location}</s.LocationTextDetail>
          </TouchableOpacity>
          <s.NumberView>
            <s.NumberText>
              {this.props.amount}
대
              <Text style={{ color: 'black' }}> 이용가능</Text>
            </s.NumberText>
          </s.NumberView>

          {/* <s.Line /> */}
        </s.InnerView>
      </s.ModalView>
    );
  }
}
