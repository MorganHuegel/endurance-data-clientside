import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { updateUserInfo } from '../../actions/userUpdate';
import { setWorkoutError } from '../../actions/workoutsDelete';

class SetPassword extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
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

  render(props){  
    if(this.state.submitted){
      return <Redirect to='/profile'/>
    } else {

    return (
      <div>
        <h3>Change password</h3>
        {this.props.workoutError}
        <form id='changePassword' name='changePassword' onSubmit={e => this.handleSubmit(e)}>
          <p>Hi {this.props.currentUser.username}! </p>
          <label htmlFor='newPassword'>Enter a new password: </label>
          <input type='password' id='newPassword' placeholder='password...' required/>
          
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input type='password' id='confirmPassword' placeholder='confirm password...' required/>

          <div>
            <button type='submit'>Update Password</button>
            <Link to='/profile'>
              <button type='reset'>Nevermind...</button>
            </Link>
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