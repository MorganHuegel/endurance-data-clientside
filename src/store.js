import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducer from './reducers/auth';
import thunk from 'redux-thunk';

export default createStore(
  combineReducers({
    auth: authReducer
  }),
  applyMiddleware(thunk)
);