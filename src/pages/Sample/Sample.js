import React from 'react';
import Logo from '/components/modules/Logo';
import * as s from './Sample.styled';
import { BleManager } from 'react-native-ble-plx';
import { TouchableOpacity, View, Text, SafeAreaView } from 'react-native';

const Sample = () => (
  <s.Container>
    <Logo />
    <s.Message>오분이면 충분하죠!</s.Message>
  </s.Container>
);

class sample extends React.Component {
  componentDidMount() {
    this.manager = new BleManager();
    const subscription = this.manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
    console.log(this.manager);
  }
  state = {
    name: 'no-device',
  };

  scanAndConnect = () => {
    console.log('scan start');
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log(error);
        return;
      }

      console.log(device.name);
      this.setState({ name: device.name });
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {
        // Stop scanning as it's not necessary if you are scanning for one device.
        this.manager.stopDeviceScan();

        // Proceed with connection.
      }
    });
  };
  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity onPress={this.scanAndConnect}>
          <View>
            <Text> click! </Text>
            <Text> {this.state.name} </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default sample;
