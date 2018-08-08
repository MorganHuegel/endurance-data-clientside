import {
  CHANGE_USER_LOADING,
  CHANGE_USER_SUCCESS,
  CHANGE_USER_FAIL
} from '../actions/register-user';
import { DELETE_WORKOUT_LOCAL, SET_WORKOUT_ERROR } from '../actions/workoutsDelete';

const initialState = {
  loading: false,
  currentUser: null,
  registerError: null,
  loginError: null,
  workoutError: null
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



  } else if (action.type === DELETE_WORKOUT_LOCAL) {
    const newWorkoutsArray = state.currentUser.workouts.filter(workout => workout.id !== action.workoutId);

    const newCurrentUser = Object.assign({}, state.currentUser, {
      workouts: newWorkoutsArray
    })

    return Object.assign({}, state, {
      loading: false,
      currentUser: newCurrentUser,
      registerError: null,
      loginError: null,
      workoutError: null
    });


  } else if (action.type === SET_WORKOUT_ERROR) {

  }

  return state;
};