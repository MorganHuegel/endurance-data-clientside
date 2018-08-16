import '../../stylesheets/user-preferences/setPassword.css';

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateUserInfo } from '../../actions/userUpdate';
import { setWorkoutError } from '../../actions/workoutsDelete';

export class SetPassword extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleSubmit(event){
    event.preventDefault();
    const newPassword = event.target.newPassword.value;
    const confirmPassword = event.target.confirmPassword.value;

    if(!newPassword){
      return this.props.dispatch(setWorkoutError('Passwords can\'t be blank'));
    } else if (newPassword.trim() !== newPassword){
      return this.props.dispatch(setWorkoutError('Passwords can\'t contain whitespace'));
    } else if (newPassword.length < 8) {
      return this.props.dispatch(setWorkoutError('Try harder! Passwords must contain at least 8 characters'));
    } else if (newPassword.length > 72) {
      return this.props.dispatch(setWorkoutError('Don\'t over-do it! Passwords must be less than 72 characters long'));
    } else if (newPassword !== confirmPassword) {
      return this.props.dispatch(setWorkoutError('Please confirm password again'));
    }
    this.setState({submitted: true}, () => {
      this.props.dispatch(updateUserInfo({password: newPassword}));
    })
  }

  handleReset(event){
    event.preventDefault();
    this.setState({submitted: true});
  }

  render(props){  
    if(this.state.submitted){
      return <Redirect to='/profile'/>
    } else {

    return (
      <div className='set-password'>
        <h2>Change password</h2>
        <p>Hi <span className='current-username'>{this.props.currentUser.username} </span>! </p>
        <form id='changePassword' name='changePassword' onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='newPassword'>Enter a new password: </label>
          <input type='password' id='newPassword' placeholder='password...' required/>
          
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input type='password' id='confirmPassword' placeholder='confirm password...' required/>

          <div className='button-container'>
            <button type='submit'>Update Password</button>
            <button type='reset' onClick={e => this.handleReset(e)}>Nevermind...</button>
          </div>
        </form>
      </div>
    )}
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  workoutError: state.auth.workoutError
})

export default connect(mapStateToProps)(SetPassword);