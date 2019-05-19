const INITIAL_STATE = {
  second: 0,
  preSecond: new Date(),
  isLent: false,
};

export default function LentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_PRESECOND':
      return {
        preSecond: action.preSecond,
        isLent: true,
      };

    case 'UPDATE_SECOND':
      return {
        second: action.second,
      };

    default:
      return state;
  }
}
