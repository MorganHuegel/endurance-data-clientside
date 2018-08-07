import { SERVER_URL } from '../config';
import { changeUserLoading, changeUserSuccess, changeUserFail } from './register-user';

export const getWorkouts = () => (dispatch) => {
  dispatch(changeUserLoading(true));
  const authToken = localStorage.getItem('authToken');
  console.log('PREPARING FOR GET REQUEST, GOT TOKEN:', authToken);
  return fetch(`${SERVER_URL}/workouts`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + authToken
    }
  })
  .then(response => {
    if(!response.ok){
      //check for specific error sent by backend
      if( response.headers.has ('content-type') 
        && response.headers.get('content-type').startsWith('application/json')
      ){
        return response.json().then(err => Promise.reject(err));
      }

      //general error from Node
      return Promise.reject({
        code: response.status,
        message: response.statusText
      })
    }

    return response.json();
  })
  .then( newUser => {
    console.log('NEW USER',newUser);
    return dispatch(changeUserSuccess(newUser));
  })
  .catch(err => {
    console.log('IN THE CATCH BLOCK', err);
    dispatch(changeUserFail(err, 'login'));
  });
}