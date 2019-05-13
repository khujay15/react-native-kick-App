import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Arrow from 'components/modules/Arrow';
import FooterClick from 'components/modules/FooterClick';

import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';

export default class Coupon extends React.Component {
  checkPermission = () => {
    if (Platform.OS === 'ios') return true;
    if (Platform.Version < 23) return true;

    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then(response => {
        console.log('response: ', response);
        if (
          response['android.permission.CAMERA'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          response['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          response['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        )
          return true;
      });
    }
  };

  handleImagePicker = async () => {
    if (await this.checkPermission()) {
      const options = {
        title: '프로필 선택',
        takePhotoButtonTitle: '사진 찍기',
        chooseFromLibraryButtonTitle: '앨범에서 사진 선택',
        customButtons: [{ name: 'default', title: '우동댕 기본 이미지' }],
        cancelButtonTitle: '취소',
        quality: 0.6,
        storageOptions: { skipBackup: true, path: 'images' },
      };
      ImagePicker.showImagePicker(options, res => {
        if (res.didCancel || res.error) return;
        console.log('enter ');
      });
    }
  };

  render() {
    return (
      <SafeAreaView>
        <Arrow />

        <TouchableOpacity onPress={this.handleImagePicker}>
          <Text>면허증 올리기 </Text>
        </TouchableOpacity>
        <FooterClick />
      </SafeAreaView>
    );
  }
}
