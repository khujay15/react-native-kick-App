import { combineReducers, createStore } from 'redux';
import LoginReducer from './LoginReducer.js';
import LentReducer from './LentReducer';

const rootReducer = combineReducers({
  LoginReducer,
  LentReducer,
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});

const Rstore = () =>
  createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
export default Rstore;
