// 주로 사용되는 state와 action을 따로 묶어 놓음
export const mapStateToPropsFromStore = state => ({
  // 로그인 리듀서
  Tutorial: state.LoginReducer.Tutorial,
  Name: state.LoginReducer.Name,
  Email: state.LoginReducer.Email,
  Status: state.LoginReducer.Status,
  // 대여 리듀서
  point: state.LentReducer.point,
  kickboard_serial: state.LentReducer.kickboard_serial,
  preSecond: state.LentReducer.preSecond,
});

export const mapDispatchToPropsFromStore = dispatch => ({
  aftertutorial: () => dispatch({ type: 'TUTORIALS' }),

  normalUser: (name, email, status) =>
    dispatch({ type: 'NORMAL_USER', Name: name, Email: email, Status: status }),

  noLicenseUser: (name, email, status) =>
    dispatch({
      type: 'NO_LICENSE_USER',
      Name: name,
      Email: email,
      Status: status,
    }),

  updatePoint: LeftPoint =>
    dispatch({ type: 'UPDATE_POINT', point: LeftPoint }),

  aleadyLent: (preSecond, kickboard_serial) =>
    dispatch({ type: 'ALEADY_LENT', preSecond, kickboard_serial }),
});

/*
0: 면허증을 등록한 멤버가 갖는 상태값. 임시로 서비스 허용 NORMAL_USER
1: 탈퇴한 멤버
2: 휴면 상태의 멤버
3: 서비스 사용 불가 상태의 멤버
4: 모든 서비스 사용 가능 상태의 멤버. 관리자의 승인이 필요함. NORMAL_USER
5: 면허증이 업로드 되지 않은 상태의 회원. NO_LICENSE_USER
*/

export const setReducerState = (res, props, state) => {
  const { status } = res.data.member;
  const { kickboard } = res.data.member;
  const { name } = res.data.member;
  const { email } = res.data.member;
  const { point } = res.data.member;

  props.updatePoint(point);

  if (kickboard) {
    // 킥보드를 이미 대여하고 있었는데, 다시 로그인 한 경우
    const LentTime = new Date(kickboard.rent_date);
    props.normalUser(name, email, status);
    props.aleadyLent(LentTime, kickboard.kick_serial_number);
    props.navigation.navigate('map');
  }
  // 정상적으로 서비스 이용이 가능한 경우
  else if (status === 0 || status === '0' || status === 4 || status === '4') {
    props.normalUser(name, email, status);
    props.navigation.navigate('map');
  }
  // 면허증을 첨부하지 않은 경우
  else if (status === 5 || status === '5') {
    props.noLicenseUser(name, email, status);
    props.navigation.navigate('map');
  }
  // 탈퇴 혹은 휴면
  else if (status === 1 || status === '1' || status === 3 || status === '3') {
  }
};

// action Type for later service
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
