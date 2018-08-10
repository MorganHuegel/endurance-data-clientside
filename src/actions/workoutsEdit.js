import { SERVER_URL } from '../config';
import { changeUserLoading } from './register-user';
import { setWorkoutError } from './workoutsDelete';


export const EDIT_WORKOUT_LOCAL = 'EDIT_WORKOUT_LOCAL';
export const editWorkoutLocal = (workoutObj) => ({
  type: EDIT_WORKOUT_LOCAL,
  workoutObj
})


export const editWorkoutDatabase = (workoutObj) => (dispatch) => {
  dispatch(changeUserLoading(true));
  const authToken = localStorage.getItem('authToken');
  return fetch(`${SERVER_URL}/workouts`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + authToken
    },
    body: JSON.stringify(workoutObj)
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
  .then( updatedWorkout => {
    dispatch(editWorkoutLocal(updatedWorkout));
  })
  .catch(err => {
    dispatch(setWorkoutError(err.message));
  });
};
