import { SNS_LOGIN } from './action';

const INITIAL_STATE = {
  Name: 'NO-NAME',
  Id: 'NO-ID',
};

export default function LoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SNS_LOGIN:
      return {
        ...state,
        Name: action.Name,
        Id: action.Id,
      };
    default:
      return state;
  }
}
