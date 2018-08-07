import { SERVER_URL } from '../config';
import { 
  changeUserLoading, 
  changeUserSuccess, 
  changeUserFail 
} from './register-user';

export const loginUser = (newUser) => (dispatch) => {
  dispatch(changeUserLoading(true));
  return fetch(SERVER_URL + '/login', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  //then receive Token from response, store in local storage
  //then send GET request with token
  //then populate currentUser workouts
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
  .then(createdUser => {
    dispatch(changeUserSuccess(createdUser)); //will update 'currentUser' in the store
  })
  .catch(err => dispatch(changeUserFail(err, 'login')) ) //will update 'loginError' in the store
}