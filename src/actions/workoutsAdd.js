import { SERVER_URL } from '../config';
import { changeUserLoading } from './register-user';
import { setWorkoutError } from './workoutsDelete';


export const ADD_WORKOUT_LOCAL = 'ADD_WORKOUT_LOCAL';
export const addWorkoutLocal = (workoutObj) => ({
  type: ADD_WORKOUT_LOCAL,
  workoutObj
})



export const addWorkoutDatabase = (newWorkoutObj) => (dispatch) => {
  dispatch(changeUserLoading(true));
  const authToken = localStorage.getItem('authToken');
  return fetch(`${SERVER_URL}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + authToken
    },
    body: JSON.stringify(newWorkoutObj)
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
  .then( ({ id }) => {
    newWorkoutObj.id = id;
    dispatch(addWorkoutLocal(newWorkoutObj));
  })
  .catch(err => {
    dispatch(setWorkoutError(err.message));
  });
};


