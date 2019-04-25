import * as LoginAction from './action';

const INITIAL_STATE = {
  Name: 'NO-NAME',
  Email: 'NO-EMAIL',
  Platform: 'NO-PLATFORM',
  Token: 'NO-TOKEN',
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
    default:
      return state;
  }
}
