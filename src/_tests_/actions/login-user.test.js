import { loginUser } from '../../actions/login-user';
import { SERVER_URL } from '../../config';
import { changeUserLoading } from '../../actions/register-user';

describe('LOGIN USER Asynch action', () => {
  it('should return a token if valid credentials are provided', () => {
    const token = 'DUMMY_TOKEN';
    const newUser = {username: 'bill', password: '12345678'}

    const dispatch = jest.fn();
    global.fetch = jest.fn().mockImplementation( () => {
      return Promise.resolve({
        ok: true,
        json(){return token}
      });
    });

    return loginUser(newUser)(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith(changeUserLoading(true));
        expect(localStorage.setItem).toHaveBeenCalledWith('authToken', token);
        expect(fetch).toHaveBeenCalledWith(`${SERVER_URL}/login`, {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      });
  });
});