import { changeUserLoading, changeUserFail } from "./register-user";
import { SERVER_URL } from '../config';
import { setWorkoutError } from "./workoutsDelete";


export const UPDATE_USER_PREFERENCES_LOCAL = 'UPDATE_USER_PREFERENCES_LOCAL';
export const updateUserPreferencesLocal = (updateObj) => {
  return {
    type: UPDATE_USER_PREFERENCES_LOCAL,
    updateObj
  }
}

export const UPDATE_USER_EMAIL_LOCAL = 'UPDATE_USER_EMAIL_LOCAL';
export const updateUserEmailLocal = (updateObj) => {
  return {
    type: UPDATE_USER_EMAIL_LOCAL,
    updateObj
  }
}

export const UPDATE_USER_USERNAME_LOCAL = 'UPDATE_USER_USERNAME_LOCAL';
export const updateUserUsernameLocal = (updateObj) => {
  return {
    type: UPDATE_USER_USERNAME_LOCAL,
    updateObj
  }
}


export const updateUserInfo = (updateObj) => (dispatch) => {
  dispatch(changeUserLoading(true));
  const authToken = localStorage.getItem('authToken');
  return fetch(`${SERVER_URL}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + authToken
    },
    body: JSON.stringify(updateObj)
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

    if (updateObj.username) {
      return response.json()
        .then(token => {
          localStorage.removeItem('authToken'); // will need new token for new username
          localStorage.setItem('authToken', token);
        })
        .then(() => dispatch(updateUserUsernameLocal(updateObj)) );
    } else if (updateObj.email) {
      return response.json()
        .then( () => dispatch(updateUserEmailLocal(updateObj)) );
    } else if (updateObj.preferences) {
      return response.json()
        .then( () => dispatch(updateUserPreferencesLocal(updateObj)) );
    } else if (updateObj.password) {
      return response.json()
        .then( () => {
          localStorage.removeItem('authToken');
          dispatch(changeUserFail({message: 'Please login again to continue'}, 'login'));
        })
    }
  })
  .catch(err => {
    dispatch(setWorkoutError(err.message));
  });
}