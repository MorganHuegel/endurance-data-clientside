import React from 'react';
import {connect} from 'react-redux';
import {registerUser, changeUserFail} from '../actions/register-user';
import { getWorkouts } from '../actions/workouts';

class RegisterForm extends React.Component{

  onSubmit = (e) => {
    e.preventDefault();
    const newUsername = e.target.registerUsername.value;
    const newPassword = e.target.registerPassword.value;
    const confirmPassword = e.target.registerConfirmPassword.value;
    const newEmail = e.target.registerEmail.value;

    //checks that password is confirmed correctly
    if(newPassword !== confirmPassword){
      return this.props.dispatch(changeUserFail({
        code: null, 
        message: 'Please confirm password again.'
      }, 'register'))
    }

    //validates that there is no whitespace at beginning or end of username or password
    ['newPassword', 'newUsername'].forEach(field => {
      if (field.trim() !== field){
        return this.props.dispatch(changeUserFail({
          code: null, 
          message: 'Username and password should not contain whitespace.'
        }, 'register'))
      }
    })

    //validates that password is correct length
    if(newPassword.length < 8){
      return this.props.dispatch(changeUserFail({
        code: null, 
        message: 'Password needs to be at least 8 characters.'
      }, 'register'))
    } else if (newPassword.length > 72){
      return this.props.dispatch(changeUserFail({
        code: null, 
        message: 'Password needs to be less than 72 characters.'
      }, 'register'))
    }


    //registers user in database, receives token, then fetches user data
    return this.props.dispatch(registerUser({
      username: newUsername,
      password: newPassword,
      email: newEmail
    }))
      .then( token => {
        if(!token){
          return;
        } else {
          return this.props.dispatch(getWorkouts());
        }
      })
  }



  render(props){
    let errorMessage;
    if(this.props.registerError){
      errorMessage = this.props.registerError.message;
    }

    return(
      <div className='register-container'>
        <h2>New user? Register here!</h2>
        <p className='error-message'>{errorMessage}</p>

        <form className='register-form' id='register-form' onSubmit={e => this.onSubmit(e)}>

          <label htmlFor='registerUsername'>Username: </label>
          <input type='text' id='registerUsername' placeholder='username' required
            ref={this.registerUsername}/>

          <label htmlFor='registerPassword'>Password: </label>
          <input type='password' id='registerPassword' placeholder='password' required/>

          <label htmlFor='registerConfirmPassword'>Confirm Password: </label>
          <input type='password' id='registerConfirmPassword' placeholder='confirm password' required/>

          <label htmlFor='registerEmail'>Email Address: </label>
          <input type='email' id='registerEmail' placeholder='(optional)'/>

          <button type='submit'>Begin Data Tracking!</button>

        </form>
      </div>
      );
  }
}


export default connect()(RegisterForm);
