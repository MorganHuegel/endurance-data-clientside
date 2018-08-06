import {
  CHANGE_USER_LOADING,
  CHANGE_USER_SUCCESS,
  CHANGE_USER_FAIL
} from '../actions/register-user';

const initialState = {
  loading: false,
  currentUser: null,
  registerError: null,
  loginError: null
}

export default function authReducer(state=initialState, action){

  if(action.type === CHANGE_USER_LOADING){
    return Object.assign({}, state, {
      loading: action.loading
    });


  } else if (action.type === CHANGE_USER_SUCCESS){
    return Object.assign({}, state, {
      loading: false,
      currentUser: action.userData,
      registerError: null,
      loginError: null
    })


  } else if (action.type === CHANGE_USER_FAIL){
    if(action.form === 'register') {
      console.log('IN REDUCER',action.error);
      return Object.assign({}, state, {
        loading: false,
        currentUser: null,
        registerError: action.error,
        loginError: null
      })
    } else if (action.form === 'login') {
      return Object.assign({}, state, {
        loading: false,
        currentUser: null,
        registerError: null,
        loginError: action.error
      })
    }
  }

  return state;
};