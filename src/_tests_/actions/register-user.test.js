import { 
  CHANGE_USER_LOADING, changeUserLoading,
  CHANGE_USER_SUCCESS, changeUserSuccess,
  CHANGE_USER_FAIL, changeUserFail,
  registerUser
 } from '../../actions/register-user';

describe('CHANGE_USER_LOADING action', () => {
  it('should return the action', () => {
    const action = changeUserLoading(true);
    expect(action.type).toEqual(CHANGE_USER_LOADING);
    expect(action.loading).toEqual(true);
  })
});

describe('CHANGE_USER_SUCCESS action', () => {
  it('should return the action', () => {
    const userData = {
      username: 'billy',
      preferences: [],
      workouts: [],
      email: 'billy@foo.com'
    }

    const action = changeUserSuccess(userData);
    expect(action.type).toEqual(CHANGE_USER_SUCCESS);
    expect(action.userData).toEqual(userData);
  })
});

describe('CHANGE_USER_FAIL action', () => {
  it('should return the action', () => {
    const error = {
      message: 'Test Error',
      code: '400'
    };
    const form = 'login';

    const action = changeUserFail(error, form);
    expect(action.type).toEqual(CHANGE_USER_FAIL);
    expect(action.error).toEqual(error);
    expect(action.form).toEqual('login');
  })
});

describe('REGISTER USER Asynch action', () => {

});