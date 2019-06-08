import React from 'react';
import {
  Text,
  Image,
  View,
  ActionSheetIOS,
  Platform,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import color from 'theme/color';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import { networks } from 'components/networks';
import ImagePicker from 'react-native-image-picker';
import * as s from './OutOfOrder.styled';
import {SHADOW} from 'theme/shadow';
import { connect } from 'react-redux';

class OutOfOrder extends React.Component {
  componentDidMount() {
    this.checkPermission();
  }
  state = {
    serial_number: '',
    location: '킥보드 주차 장소를 선택해주세요',
    clickList: [0],

    hasImg: false,
    img: '',
    type: '',
    Error: false,
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
      return this.IsGranted;
    }
  };

  handleImagePicker = () => {
    if (this.IsGranted) {
      const options = {
        title: '사진 올리기',
        takePhotoButtonTitle: '사진 찍기',
        chooseFromLibraryButtonTitle: '앨범에서 사진 선택',

        quality: 0.6,
        storageOptions: { skipBackup: true, path: 'images' },
      };
      ImagePicker.showImagePicker(options, res => {
        if (res.didCancel || res.error) return;
        console.log(res);
        this.setState({ img: res.uri, hasImg: true, type: res.type });
      });
    }
  };

  sendReport = () => {
    const ImageForm = new FormData();

    const breakPart = this.ListToStr();
    console.log(breakPart);

    ImageForm.append('serial_number', this.state.serial_number);
    ImageForm.append('breakdown_part', breakPart);

    const imguri =
      Platform.OS === 'android'
        ? this.state.img
        : this.state.img.replace('file://', '');
    ImageForm.append('breakdownImage', {
      uri: imguri,
      name: this.props.Email,
      type: this.state.type,
    });

    networks
      .post('https://api.oboonmobility.com/v0/reports/breakdown', ImageForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
          this.setState({Error: false});
          this.props.navigation.navigate('cservice');   
          
      })
      .catch(err => {
        if(err.response.status === 400 || err.response.status ==='400')
        this.props.navigation.navigate('cservice');
        else
        this.setState({Error: err.response.data.msg})
      
      }
      );
  };

  handleSerialNumber = TypedText => {
    this.setState({ serial_number: Number(TypedText) });
  };

  ClickHandler = async id => {
    let isIn = false;
   
    for (i in this.state.clickList) {
      if (this.state.clickList[i] === id) {
        await this.setState({
          clickList: this.state.clickList.filter(item => item !== id),
        });
        isIn = true;
        break;
      }
    }
    if (!isIn) {
      await this.setState({ clickList: [...this.state.clickList, id] });
    }
  };

  ListToStr = () => {
    let str="";

    for (i in this.state.clickList) {
      switch(this.state.clickList[i]){
        case 1:
          str=str+' 가속레버';
          break;
          case 2:
          str=str+' 핸들';
          break;
          case 3:
          str=str+' 전원';
          break;
          case 4:
          str=str+' 발판';
          break; 
          case 5:
          str=str+' 앞바퀴';
          break;
          case 6:
          str=str+' 뒷바퀴';
          break;
          case 7:
          str=str+' 기타';
          break;
      }
    }
    return str;
  }

  handleViewStyle = (style, id) => {
    for (i in this.state.clickList) {
      if (this.state.clickList[i] === id) {
        style = {
          ...style,
          borderWidth: 1,
          borderBottomWidth: 1,
          borderColor: color.oboon,
          color: color.oboon,
        };
      }
    }
    return style;
  };

  handleTextStyle = (style, id) => {
    for (i in this.state.clickList) {
      if (this.state.clickList[i] === id) {
        style = {
          ...style,
          fontWeight: 'normal',
          color: color.oboon,
        };
      }
    }
    return style;
  };

  updateLocation = loc => {
    this.setState({ location: loc });
  };

  showActionSheet() {
    const Loc = ['취소', '외국어대학관', '전자정보대학관'];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: Loc,

        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex > 0) this.setState({ location: Loc[buttonIndex] });
      },
    );
  }

  render() {
    const shadowStyle = {
      shadowRadius: 3,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 5 },
    };
    const TextStyle = {
      fontSize: 16,
      fontWeight: '200',
      color: color.grey,
    };

    return (
      <>
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <Arrow onPress={() => this.props.navigation.navigate('cservice')} />
          <ThemeText style={{ marginBottom: 60 }}>고장신고</ThemeText>
          <View style={{ marginHorizontal: 24 }}>
            <s.IndicatorText>킥보드 번호</s.IndicatorText>
            <InputBox
              keyboardType="numeric"
              onChangeText={this.handleSerialNumber}
              placeholder="   킥보드 번호 4자리를 입력해주세요"
              placeholderTextColor="rgb(106, 106, 106)"
            />

            <View>
              <s.IndicatorText style={{ marginTop: 10 }}>
                고장난 부분 선택
              </s.IndicatorText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <s.SmallSelectBox
                  style={this.handleViewStyle(shadowStyle, 1)}
                  onPress={() => this.ClickHandler(1)}
                >
                  <Text style={this.handleTextStyle(TextStyle, 1)}>
                    가속레버
                  </Text>
                </s.SmallSelectBox>

                <s.SmallSelectBox
                  style={this.handleViewStyle(shadowStyle, 2)}
                  onPress={() => this.ClickHandler(2)}
                >
                  <Text style={this.handleTextStyle(TextStyle, 2)}>핸들</Text>
                </s.SmallSelectBox>

                <s.SmallSelectBox
                  style={this.handleViewStyle(shadowStyle, 3)}
                  onPress={() => this.ClickHandler(3)}
                >
                  <Text style={this.handleTextStyle(TextStyle, 3)}>전원</Text>
                </s.SmallSelectBox>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <s.SmallSelectBox
                  style={this.handleViewStyle(shadowStyle, 4)}
                  onPress={() => this.ClickHandler(4)}
                >
                  <Text style={this.handleTextStyle(TextStyle, 4)}>발판</Text>
                </s.SmallSelectBox>

                <s.SmallSelectBox
                  style={this.handleViewStyle(shadowStyle, 5)}
                  onPress={() => this.ClickHandler(5)}
                >
                  <Text style={this.handleTextStyle(TextStyle, 5)}>앞바퀴</Text>
                </s.SmallSelectBox>

                <s.SmallSelectBox
                  style={this.handleViewStyle(shadowStyle, 6)}
                  onPress={() => this.ClickHandler(6)}
                >
                  <Text style={this.handleTextStyle(TextStyle, 6)}>뒷바퀴</Text>
                </s.SmallSelectBox>
              </View>
              <s.SmallSelectBox
                style={this.handleViewStyle(shadowStyle, 7)}
                onPress={() => this.ClickHandler(7)}
              >
                <Text style={this.handleTextStyle(TextStyle, 7)}>기타</Text>
              </s.SmallSelectBox>
            </View>
            <s.IndicatorText>사진 첨부</s.IndicatorText>
            <s.SelectBox
              style={SHADOW.ios}
              onPress={() => this.handleImagePicker()}
            >
              <View style={{backgroundColor: 'white', width:100, height:100 ,justifyContent: 'center', alignItems: 'center'}}>
              {this.state.hasImg ? (
                <Image source={{ uri: this.state.img }} style={{width: 100, height: 100}} />
              ) : (
                <Text style={{ fontSize: 40, color: color.grey }}>+</Text>
              )}
              </View>
            </s.SelectBox>
{/*             
            <s.IndicatorText>상세 설명</s.IndicatorText>
            <s.DescriptionInput
              style={shadowStyle}
              placeholder="   상세한 설명을 적어주세요"
              placeholderTextColor="rgb(106, 106, 106)"
            /> */}
            {
              this.state.Error &&( <s.ErrorText>{this.state.Error}</s.ErrorText>)
            }
          </View>
        </ScrollView>
        <FooterClick
          color={color.oboon}
          text={'신고하기'}
          onPress={() => this.sendReport()}
        />
      </>
    );
  }
}



const mapStateToProps = state => ({

  Email: state.LoginReducer.Email,

});

const OutOfOrderContainer = connect(
  mapStateToProps,

)(OutOfOrder);

export default OutOfOrderContainer;

