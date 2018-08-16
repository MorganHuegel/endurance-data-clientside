import {
    CHANGE_USER_LOADING,
    CHANGE_USER_SUCCESS,
    CHANGE_USER_FAIL
  } from '../actions/register-user';

import { 
    DELETE_WORKOUT_LOCAL, 
    SET_WORKOUT_ERROR 
  } from '../actions/workoutsDelete';

import { 
    UPDATE_USER_PREFERENCES_LOCAL,
    UPDATE_USER_EMAIL_LOCAL,
    UPDATE_USER_USERNAME_LOCAL 
  } from '../actions/userUpdate';

  import { ADD_WORKOUT_LOCAL } from '../actions/workoutsAdd';
  import { EDIT_WORKOUT_LOCAL } from '../actions/workoutsEdit';


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
    action.userData.workouts.forEach(workout => { //database stores data in Zulu time.
      workout.date = workout.date.replace(/Z/g, '');  //dropping the 'Z' at the end converts it to local time
    })

    return Object.assign({}, state, {
      loading: false,
      currentUser: action.userData,
      registerError: null,
      loginError: null,
      workoutError: null
    })




  } else if (action.type === CHANGE_USER_FAIL){
    if(action.form === 'register') {
      return Object.assign({}, state, {
        loading: false,
        currentUser: null,
        registerError: action.error,
        loginError: null,
        workoutError: null
      })
    } else if (action.form === 'login') {
      return Object.assign({}, state, {
        loading: false,
        currentUser: null,
        registerError: null,
        loginError: action.error,
        workoutError: null
      })
    }




  } else if (action.type === UPDATE_USER_PREFERENCES_LOCAL) {
    const { preferences } = action.updateObj;
    const newCurrentUser = Object.assign({}, state.currentUser, {
      preferences: preferences
    });

    return Object.assign({}, state, {
      loading: false,
      currentUser: newCurrentUser,
      registerError: null,
      loginError: null,
      workoutError: null
    });




  } else if (action.type === UPDATE_USER_EMAIL_LOCAL) {
    const { email } = action.updateObj;
    const newCurrentUser = Object.assign({}, state.currentUser, {
      email: email
    });

    return Object.assign({}, state, {
      loading: false,
      currentUser: newCurrentUser,
      registerError: null,
      loginError: null,
      workoutError: null
    });




  } else if (action.type === UPDATE_USER_USERNAME_LOCAL) {
    const { username } = action.updateObj;
    const newCurrentUser = Object.assign({}, state.currentUser, {
      username: username
    });

    return Object.assign({}, state, {
      loading: false,
      currentUser: newCurrentUser,
      registerError: null,
      loginError: null,
      workoutError: null
    });




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



  } else if (action.type === ADD_WORKOUT_LOCAL) {
    action.workoutObj.date = action.workoutObj.date.replace(/Z/g, '');  //dropping the 'Z' at the end converts it to local time
    const newCurrentUser = Object.assign({}, state.currentUser, {
      workouts: [...state.currentUser.workouts, action.workoutObj]
    });

    return Object.assign({}, state, {
      loading: false,
      currentUser: newCurrentUser,
      registerError: null,
      loginError: null,
      workoutError: null
    });



  } else if (action.type === EDIT_WORKOUT_LOCAL) {
    action.workoutObj.date = action.workoutObj.date.replace(/Z/g, '');  //dropping the 'Z' at the end converts it to local time
    const untouchedWorkouts = state.currentUser.workouts.filter(workout => workout.id !== action.workoutObj.id)

    untouchedWorkouts.push(action.workoutObj);

    const newCurrentUser = Object.assign({}, state.currentUser, {
      workouts: untouchedWorkouts
    });

    return Object.assign({}, state, {
      loading: false,
      currentUser: newCurrentUser,
      registerError: null,
      loginError: null,
      workoutError: null
    });



  } else if (action.type === SET_WORKOUT_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      registerError: null,
      loginError: null,
      workoutError: action.errMessage
    });
  }


  

  return state;
};