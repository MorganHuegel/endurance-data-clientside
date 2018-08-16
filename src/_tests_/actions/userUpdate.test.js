import {
  UPDATE_USER_EMAIL_LOCAL, updateUserEmailLocal,
  UPDATE_USER_USERNAME_LOCAL, updateUserUsernameLocal,
  UPDATE_USER_PREFERENCES_LOCAL, updateUserPreferencesLocal,
  updateUserInfo
} from '../../actions/userUpdate';

describe('UPDATE_USER_EMAIL_LOCAL action', () => {
  it('should return the action', () => {
    const action = updateUserEmailLocal({email: 'derp@foo.com'});
    expect(action.type).toEqual(UPDATE_USER_EMAIL_LOCAL);
    expect(action.updateObj).toEqual({email: 'derp@foo.com'});
  })
});

describe('UPDATE_USER_USERNAME_LOCAL action', () => {
  it('should return the action', () => {
    const action = updateUserUsernameLocal({username: 'derpyderp'});
    expect(action.type).toEqual(UPDATE_USER_USERNAME_LOCAL);
    expect(action.updateObj).toEqual({username: 'derpyderp'});
  })
});

describe('UPDATE_USER_PREFERENCES_LOCAL action', () => {
  it('should return the action', () => {
    const action = updateUserPreferencesLocal({preferences: ['hoursOfSleep', 'totalTime']});
    expect(action.type).toEqual(UPDATE_USER_PREFERENCES_LOCAL);
    expect(action.updateObj).toEqual({preferences: ['hoursOfSleep', 'totalTime']});
  })
});

describe('UPDATE USER INFO Asynch action', () => {
  
});