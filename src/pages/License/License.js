import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  View,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Arrow from 'components/modules/Arrow';
import FooterClick from 'components/modules/FooterClick';
import ThemeText from 'components/modules/ThemeText';
import color from 'theme/color';
import { connect } from 'react-redux';
import * as s from './License.styled';

export default class License extends React.Component {
  componentDidMount() {
    this.checkPermission();
  }

  state = {
    img: '',
  };

  IsGranted = false;

  checkPermission = () => {
    if (Platform.OS === 'ios') this.IsGranted = true;
    if (Platform.Version < 23) this.IsGranted = true;

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
          this.IsGranted = true;
      });
      console.log(this.IsGranted);
      return this.IsGranted;
    }
  };

  handleImagePicker = () => {
    console.log('img picker');
    if (this.IsGranted) {
      const options = {
        title: '면허증 올리기',
        takePhotoButtonTitle: '사진 찍기',
        chooseFromLibraryButtonTitle: '앨범에서 면허증 선택',

        quality: 0.6,
        storageOptions: { skipBackup: true, path: 'images' },
      };
      ImagePicker.showImagePicker(options, res => {
        if (res.didCancel || res.error) return;
        console.log(res);
        this.setState({ img: res.uri });
      });
    }
  };

  render() {
    const { img } = this.state;
    return (
      <>
        <Arrow />
        <s.SkipText onPress={() => this.props.navigation.navigate('mappage')}>
          <Text style={{ color: 'rgb(106,106,106)' }}>건너뛰기</Text>
        </s.SkipText>
        <ThemeText>운전면허증을 등록해주세요</ThemeText>

        <s.LicenseView>
          <s.InnerText>
            오분 서비스를 이용하기 위해 운전면허증 혹은 원동기 면허가 필요합니다
          </s.InnerText>
          <s.ImageView>
            <s.License
              source={
                img ? { uri: img } : require('assets/tutorials/Tutorial_4.png')
              }
            />
          </s.ImageView>

          <s.DescView>
            <s.DotView>
              <s.Dot />
              <Text style={{ color: 'rgb(106,106,106)' }}>
                카메라 초점을 잘 맞춰주세요
              </Text>
            </s.DotView>

            <s.DotView>
              <s.Dot />
              <Text style={{ color: 'rgb(106,106,106)' }}>
                너무 어두운 배경에선 찍지 말아주세요
              </Text>
            </s.DotView>
          </s.DescView>
        </s.LicenseView>
        <FooterClick
          text="등록하기"
          color={color.oboon}
          onPress={this.handleImagePicker}
        />
      </>
    );
  }
}
