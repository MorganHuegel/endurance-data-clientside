import { SERVER_URL } from '../config';

export const CHANGE_USER_LOADING = 'CHANGE_USER_LOADING';
export function changeUserLoading(loading) {
  return {
    type: CHANGE_USER_LOADING,
    loading
  }
}

export const CHANGE_USER_SUCCESS = 'CHANGE_USER_SUCCESS';
export function changeUserSuccess(userData) {
  return {
    type: CHANGE_USER_SUCCESS,
    userData
  }
}

export const CHANGE_USER_FAIL = 'CHANGE_USER_FAIL';
export function changeUserFail(error, form) {
  return {
    type: CHANGE_USER_FAIL,
    error,
    form
  }
}





export const registerUser = (newUser) => (dispatch) => {
  dispatch(changeUserLoading(true));
  return fetch(SERVER_URL + '/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(!res.ok){

      //check for specific error sent by backend
      if( res.headers.has ('content-type') 
        && res.headers.get('content-type').startsWith('application/json')
      ){
        return res.json().then(err => Promise.reject(err));
      }

      //general error from Node
      return Promise.reject({
        code: res.status,
        message: res.statusText
      })
    }

    //successful response
    return res.json();
  })
  .then(token => {
    localStorage.setItem('authToken', token);
    return token;
  })
  .catch(err => {
    dispatch(changeUserFail(err, 'register'));  //will update 'registerError' in the store
  })   
}