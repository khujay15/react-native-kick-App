import React from 'react';
import InputBox from 'components/modules/InputBox';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';
import {connect} from 'react-redux';
import { networks ,setHeader} from 'components/networks';
import {
  setReducerState,
  mapStateToPropsFromStore,
  mapDispatchToPropsFromStore,
} from 'store/action';

import { PhoneMainView, ErrorText, SubText } from './AuthEmail.styled';
import SInfo from 'react-native-sensitive-info';
import color from 'theme/color';

class AuthEmail extends React.Component {
  state = {
    Email: '',
    Name: '',
    
    IsEmailError: false,
    ErrorText: false,
  };

  InputCheck =() => {
    return (this.state.Email !==''  && !this.state.IsEmailError );
  }
  handleEmail = TypedText => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (TypedText.match(regExp) != null) {
      this.setState({
        Email: TypedText,
        IsEmailError: false,
      });
    } else {
      this.setState({ IsEmailError: true });
    }
  };


  handleName = TypedText => {
    this.setState({ Name: TypedText, IsName: color.oboon });
  };

  

  KakaoLogin = () => {
  
    if (this.props.Token !== 'NO-TOKEN') {
      console.log(this.props.Token);
      const data = JSON.stringify({
        email : this.state.Email,
        accessToken: this.props.Token,
      });
    

      networks
      .post('https://api.oboonmobility.com/v0/members/login.kakao', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        if (res.data.accesstoken) {
          console.log(res.data.accesstoken);
          setHeader(res.data.accesstoken);
          SInfo.setItem('AutoToken',`${res.data.accesstoken}`, {});
          setReducerState(res, this.props, this.state);

        }
      })
      .catch(err => {
        console.log(err.response);
        this.setState({ErrorText: '네트워크에 문제가 있습니다. 앱을 다시 실행해주세요'})
      });
    }
  };

  render() {
    return (
      <>
        <DefaultArrowPage
          arrowOnPress={() => this.props.navigation.goBack()}
          themeText="등록하기"
          greyText="고객님의 이메일 주소와 이름를 입력해주세요"
          footerOnPress={() => this.InputCheck() ? this.KakaoLogin(): null}
          footerColor={this.InputCheck() ? color.oboon : 'grey'}
          footerText="등록하기"
        >
         

          <PhoneMainView>
            <InputBox
              placeholder="이메일 주소를 입력해주세요"
              onChangeText={this.handleEmail}
              toggle={this.state.IsEmailError}
            />
            {this.state.IsEmailError ? (
              <ErrorText> 잘못된 이메일 형식입니다.</ErrorText>
            ) : null}
             {this.state.ErrorText ? (
              <ErrorText> {this.state.ErrorText}</ErrorText>
            ) : null}
          

          </PhoneMainView>
          </DefaultArrowPage>

      </>
    );
  }
}

const AuthEmailContainer = connect(
  mapStateToPropsFromStore,
  mapDispatchToPropsFromStore,
)(AuthEmail);

export default AuthEmailContainer;
