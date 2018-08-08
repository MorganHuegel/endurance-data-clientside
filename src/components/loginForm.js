import React from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions/login-user';
import { getWorkouts } from '../actions/workouts';
import { changeUserFail } from '../actions/register-user';

class LoginForm extends React.Component{

  onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.loginUsername.value;
    const password = e.target.loginPassword.value;

    //validates that username and password are entered without whitespace
    [username, password].forEach(field => {
      if(!field){
        return this.props.dispatch(changeUserFail({
          code: null,
          message: `Must provide ${field} to login.`
        }, 'login'));

      } else if (field.trim() !== field) {
        return this.props.dispatch(changeUserFail({
          code: null,
          message: `${field} should not contain whitespace.`
        }, 'login'));
      }
    });

    //validates password length before calling database
    if(password.length < 8){
      return this.props.dispatch(changeUserFail({
        code: null,
        message: 'Password should be longer than 8 characters.'
      }, 'login'));
    } else if (password.length > 72){
      return this.props.dispatch(changeUserFail({
        code: null,
        message: 'Password should be shorter than 72 characters.'
      }, 'login'));
    }

    //fetches token from server if valid credentials, then fetches workouts
    return this.props.dispatch(loginUser({username, password}))
      .then( token => {
        if(!token){
          return;
        } else {
          this.props.dispatch(getWorkouts());
        }
      })
  }


  render(props){
    let errorMessage;
    if(this.props.loginError){
      errorMessage = this.props.loginError.message
    }

    return(
      <div className='login-container'>
        <h2>Login</h2>
        <p className='error-message'>{errorMessage}</p>

        <form className='login-form' id='login-form' onSubmit={e => this.onSubmit(e)}>
          <label htmlFor='loginUsername'>Username: </label>
          <input type='text' id='loginUsername' placeholder='username' required 
          ref={this.loginUsername} />

          <label htmlFor='loginPassword'>Password: </label>
          <input type='password' id='loginPassword' placeholder='password' required 
          ref={this.loginPassword} />

          <button type='submit'>Login</button>

        </form>
      </div>
      );
  }
}

export default connect()(LoginForm);