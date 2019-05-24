import React from 'react';
import IMP from 'iamport-react-native';

export function getUserCode(pg) {
  switch (pg) {
    case 'kakao':
      return 'imp10391932';
    case 'paypal':
      return 'imp09350031';
    case 'mobilians':
      return 'imp60029475';
    case 'naverco':
      return 'imp41073887';
    case 'naverpay':
      return 'imp41073887';
    default:
      return 'imp19424728';
  }
}

export class authtest extends React.Component {
  static navigationOptions = {
    title: 'authtest',
  };

  callback = response => {
    console.log(response);
    const { navigation } = this.props;
    navigation.replace('authtestResult', response);
  };

  render() {
    const { navigation } = this.props;

    const pg = 'html5_inicis';
    const pay_method = 'card';
    const data = {
      pg,
      pay_method,
      name: '아임포트 결제데이터 분석',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: '1000',
      buyer_name: '홍길동',
      buyer_tel: '01012345678',
      buyer_email: 'example@naver.com',
      buyer_addr: '서울시 강남구 신사동 661-16',
      buyer_postcode: '06018',
      app_scheme: 'example',
      // [Deprecated v1.0.3]: m_redirect_url
    };

    /* 가상계좌의 경우, 입금기한 추가 */
    const vbank_due = navigation.getParam('vbank_due');
    if (pay_method === 'vbank' && vbank_due) {
      data.vbank_due = vbank_due;
    }

    /* 정기결제의 경우, customer_uid는 필수입력필드 */
    if (pg === 'kcp_billing') {
      data.customer_uid = `cuid_${new Date().getTime()}`;
    }

    /* 네이버 체크아웃 대비 */
    if (pg === 'naverco') {
      data.naverProducts = [
        {
          id: 1286,
          name: '\uae40\uce58 with icebox',
          basePrice: '10000',
          taxType: 'TAX',
          quantity: 1,
          infoUrl:
            'http://demo.movingcart.kr/\uc0c1\ud488/%ea%b9%80%ec%b9%98-with-icebox',
          imageUrl:
            'http://demo.movingcart.kr/wp-content/uploads/2015/08/blueberry.jpg',
          shipping: {
            groupId: '1-5',
            method: 'DELIVERY',
            baseFee: 5000,
            feeType: 'CONDITIONAL_FREE',
            feePayType: 'PREPAYED',
            feeRule: {
              freeByThreshold: 50000,
            },
          },
        },
        {
          id: 1287,
          name: 'just \uae40\uce58',
          basePrice: '20000',
          taxType: 'TAX',
          quantity: 1,
          infoUrl:
            'http://demo.movingcart.kr/\uc0c1\ud488/just-%ea%b9%80%ec%b9%98',
          imageUrl:
            'http://demo.movingcart.kr/wp-content/uploads/2015/08/fancybox.jpg',
          shipping: {
            groupId: '1-5',
            method: 'DELIVERY',
            baseFee: 3000,
            feeType: 'CONDITIONAL_FREE',
            feePayType: 'PREPAYED',
            feeRule: {
              freeByThreshold: 50000,
            },
          },
        },
      ];
    }

    if (pay_method === 'phone') {
      data.digital = false;
    }

    return (
      <IMP.Payment
        userCode={getUserCode(pg)}
        data={data}
        callback={this.callback}
        loading={{
          message: '잠시만 기다려주세요...',
        }}
      />
    );
  }
}
