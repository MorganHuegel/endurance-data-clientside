import { SERVER_URL } from '../config';
import { changeUserLoading } from './register-user';


export const DELETE_WORKOUT_LOCAL = 'DELETE_WORKOUT';
export const deleteWorkoutLocal = (workoutId) => ({
  type: DELETE_WORKOUT_LOCAL,
  workoutId
})


export const SET_WORKOUT_ERROR = 'SET_WORKOUT_ERROR';
export const setWorkoutError = (errMessage) => ({
  type: DELETE_WORKOUT_LOCAL,
  errMessage
})


export const deleteWorkoutDatabase = (workoutId) => (dispatch) => {
  dispatch(changeUserLoading(true));
  const authToken = localStorage.getItem('authToken');
  return fetch(`${SERVER_URL}/workouts/${workoutId}`, {
    method: 'DELETE',
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

    return response.status;
  })
  .then(status => {
    console.log('STATUS',status, typeof status);
    if (status === 204){
      dispatch(deleteWorkoutLocal(workoutId));
    }
  })
  .catch(err => {
    dispatch(setWorkoutError(err.message));
  });
};


