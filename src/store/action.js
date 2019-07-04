export const SNS_LOGIN = 'SNS_LOGIN';
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const KAKAO_LOGIN = 'KAKAO_LOGIN';
export const LOCAL_LOGIN = 'LOCAL_LOGIN';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const TUTORIALS = 'TUTORIALS';
export const LICENSE = 'LICENSE';
export const PHONE = 'PHONE';
export const PAYMENT = 'PAYMENT';
export const MEMBERINFO = 'MEMBERINFO';

export const TOKEN = 'TOKEN';

/*
0: 면허증을 등록한 멤버가 갖는 상태값. 임시로 서비스 허용
1: 탈퇴한 멤버
2: 휴면 상태의 멤버
3: 서비스 사용 불가 상태의 멤버
4: 모든 서비스 사용 가능 상태의 멤버. 관리자의 승인이 필요함.
5: 면허증이 업로드 되지 않은 상태의 회원.
*/

export const setReducerAction = (res, props, state) => {
  console.log(res);
  console.log(props);
  console.log(state);
  const { status } = res.data.member;

  const { kickboard } = res.data.member;
  const { name } = res.data.member;
  const { email } = res.data.member;
  const { point } = res.data.member;
  props.updatePoint(point);

  if (kickboard) {
    const LentTime = new Date(kickboard.rent_date);
    props.member(name, email, status);

    props.aleadyLent(LentTime, kickboard.kick_serial_number);
    props.navigation.navigate('map');
  } else if (status === 0 || status === '0' || status === 4 || status === '4') {
    props.member(name, email, status);
  } else if (status === 3 || status === '3' || status === 6 || status === '6') {
    props.afterGOOGLELogin(name, email, state.token);
    props.hasPhone();
  } else if (status === 5 || status === '5') {
    props.afterGOOGLELogin(name, email, state.token);
    props.navigation.navigate('map');
  } else if (status === 1 || status === '1') {
    // /탈퇴
  }
};
