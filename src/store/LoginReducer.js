import * as LoginAction from './action';

const INITIAL_STATE = {
  Name: 'NO-NAME',
  Email: 'NO-EMAIL',
  Platform: 'NO-PLATFORM',
  Token: 'NO-TOKEN',
  Tutorial: 'NO-WATCH',
  License: false,
  Phone: true,
  Payment: true,
  Status: -1,
};

export default function LoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NORMAL_USER':
      return {
        ...state,
        License: true,
        Status: action.Status,
        Name: action.Name,
        Email: action.Email,
      };

    case 'NO_LICENSE_USER':
      return {
        ...state,
        License: false,
        Status: action.Status,
        Name: action.Name,
        Email: action.Email,
      };

    case 'LICENSE':
      return {
        ...state,
        License: true,
      };
    // only two action for beta. below actions are useless//
    case LoginAction.KAKAO_LOGIN:
      return {
        ...state,
        Name: action.Name,
        Platform: 'KAKAO',
      };
    case LoginAction.GOOGLE_LOGIN:
      return {
        ...state,
        Name: action.Name,
        Email: action.Email,
        Platform: 'GOOGLE',
        Token: action.Token,
      };
    case LoginAction.TUTORIALS:
      return {
        ...state,
        Tutorial: 'watch',
      };
    case LoginAction.MEMBERINFO:
      return {
        ...state,
        License: true,
        Phone: true,
        Payment: true,

        Status: action.Status,
        Name: action.Name,
        Email: action.Email,
      };
    case LoginAction.TOKEN:
      return {
        ...state,
        Token: action.Token,
      };

    case LoginAction.PHONE:
      return {
        ...state,
        Phone: true,
      };
    case LoginAction.PAYMENT:
      return {
        ...state,
        Payment: true,
      };

    default:
      return state;
  }
}
