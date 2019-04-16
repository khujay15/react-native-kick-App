import React from 'react';
import IMP from 'iamport-react-native';

export class authtest extends React.Component {
  callback = response => {
    console.log(response);
    /* [필수입력] 본인인증 종료 후, 라우터를 변경하고 결과를 전달합니다. */
    const { navigation } = this.props;
    navigation.navigate('login');
  };

  render() {
    /* [필수입력] 본인인증에 필요한 데이터를 입력합니다. */
    const data = {
      merchant_uid: '1111111111',
    };

    return (
      <IMP.Certification
        userCode={'imp49977043'}
        data={data}
        callback={this.callback}
        loading={{
          message: '잠시만 기다려주세요...',
        }}
      />
    );
  }
}
