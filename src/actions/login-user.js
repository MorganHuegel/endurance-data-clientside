import { SERVER_URL } from '../config';
import { 
  changeUserLoading, 
  changeUserFail 
} from './register-user';


export const loginUser = (newUser) => (dispatch) => {
  dispatch(changeUserLoading(true));
  localStorage.removeItem('authToken');
  console.log('LOCAL STORAGE BEFORE', localStorage);
  return fetch(SERVER_URL + '/login', {
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
    dispatch(changeUserFail(err, 'login'));  //will update 'loginError' in the store
  }) 
}