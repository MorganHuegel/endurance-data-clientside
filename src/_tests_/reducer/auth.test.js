import authReducer from '../../reducers/auth';

//import all the synchronous actions
import {changeUserFail, changeUserSuccess, changeUserLoading} from '../../actions/register-user';
import {updateUserEmailLocal, updateUserPreferencesLocal, updateUserUsernameLocal} from '../../actions/userUpdate';
import {addWorkoutLocal} from '../../actions/workoutsAdd';
import {deleteWorkoutLocal, setWorkoutError} from '../../actions/workoutsDelete';
import {editWorkoutLocal} from '../../actions/workoutsEdit';



describe('AUTH REDUCER', () => {
  it('should return intial state if nothing is passed', () => {
    const state = authReducer(undefined, {type: 'NOT_A_REAL_ACTION'});
    expect(state).toEqual({
        loading: false,
        currentUser: null,
        registerError: null,
        loginError: null,
        workoutError: null
    });
  });

  it('should return the current state if action type is unknown', () => {
    const currentState = {
      loading: true,
      currentUser: null,
      registerError: null,
      loginError: null,
      workoutError: null
    };

    const state = authReducer(currentState, {action: 'NOT_A_REAL_ACTION'});
    expect(state).toEqual(currentState);
  });

  describe('CHANGE_USER_LOADING reducer', () => {
    it('should update loading state based on action.loading', () => {
      let state;
      state = authReducer(state, changeUserLoading(true));
      expect(state).toEqual({
        loading: true,
        currentUser: null,
        registerError: null,
        loginError: null,
        workoutError: null
      });

      state = authReducer(state, changeUserLoading(false));
      expect(state).toEqual({
        loading: false,
        currentUser: null,
        registerError: null,
        loginError: null,
        workoutError: null
      });
    });
  });


});