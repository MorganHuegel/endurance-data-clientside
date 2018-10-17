import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducer from './reducers/auth';
import thunk from 'redux-thunk';

export default createStore(
  combineReducers({
    auth: authReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);