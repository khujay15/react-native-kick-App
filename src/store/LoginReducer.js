import * as LoginAction from './action';

const INITIAL_STATE = {
  Name: 'NO-NAME',
  Email: 'NO-EMAIL',
  Platform: 'NO-PLATFORM',
  Token: 'NO-TOKEN',
  Tutorial: 'NO-WATCH',
  License: false,
  Phone: false,
  Payment: false,
  Status: -1,
};

export default function LoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LoginAction.KAKAO_LOGIN:
      return {
        ...state,
        Name: action.Name,
        Platform: 'KAKAO',
        Token: action.Token,
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
    case LoginAction.LICENSE:
      return {
        ...state,
        License: true,
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
