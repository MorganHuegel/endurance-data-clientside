import { getWorkouts } from '../../actions/workoutsGet';
import { changeUserLoading, changeUserSuccess, changeUserFail } from '../../actions/register-user';
import { SERVER_URL } from '../../config';

describe('GET workouts Asynch action', () => {

  it('should dispatch changeUserSuccess if fetch is resolved', () => {
    const userData = {
      username: 'derpyderp',
      workouts: [],
      preferences: [],
      email: 'derp@foo.com'
    };

    const headers = {
      "headers": {
        "Content-Type": "application/json", 
        "authorization": "Bearer undefined" //undefined because it can't actually pull a token from local storage
      }                                     //localStoragae.getItem is just a spy function by this point
    };

    //simulates the fetch method resolve case
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json(){
          return userData;
        }
      });
    });

    const dispatch = jest.fn();

    return getWorkouts()(dispatch).then( () => {
      expect(dispatch).toHaveBeenCalledWith(changeUserLoading(true));
      expect(dispatch).toHaveBeenCalledWith(changeUserSuccess(userData));
      expect(fetch).toHaveBeenCalledWith(`${SERVER_URL}/workouts`, headers);
    });

  });




  it('should dispatch changeUserFail if fetch is rejected', () => {
    const testError = {
      ok: false,
      statusText: 'TEST ERROR',
      status: 400,
      headers: {has: () => null},
    }; //action checks response for the function 'response.headers.has()'

    const headers = {
      "headers": {
        "Content-Type": "application/json", 
        "authorization": "Bearer undefined" //undefined because it can't actually pull a token from local storage
      }                                     //localStoragae.getItem is just a spy function by this point
    };

    //simulates the fetch method resolve case
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(testError);
    });

    const dispatch = jest.fn();

    return getWorkouts()(dispatch).then( () => {
      expect(dispatch).toHaveBeenCalledWith(changeUserLoading(true));
      expect(dispatch).toHaveBeenCalledWith(changeUserFail({message: 'TEST ERROR', code: 400}, 'login'));
      expect(fetch).toHaveBeenCalledWith(`${SERVER_URL}/workouts`, headers);
    });

  })
});