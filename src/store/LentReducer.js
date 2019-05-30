const INITIAL_STATE = {
  second: 0,
  minute: 0,
  preSecond: new Date(),
  isLent: false,
  kickboard_serial: 0,
  returnmodal: false,
  returndata: false,
  point: 0,
};

export default function LentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ALEADY_LENT':
      return {
        ...state,
        preSecond: action.preSecond,
        kickboard_serial: action.kickboard_serial,
        isLent: true,
      };

    case 'UPDATE_SECOND':
      return {
        ...state,
        second: action.second,
      };
    case 'UPDATE_MINUTE':
      return {
        ...state,
        minute: action.minute,
      };

    case 'LENT_START':
      return {
        ...state,
        preSecond: action.preSecond,
        isLent: true,
        kickboard_serial: action.kickboard_serial,
      };
    case 'LENT_END':
      return {
        ...state,
        isLent: false,
        returnmodal: true,
        point: action.point,
        returndata: action.returndata,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        returnmodal: false,
      };
    case 'UPDATE_POINT':
      return {
        ...state,
        point: action.point,
      };

    default:
      return state;
  }
}
