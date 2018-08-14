import '../../stylesheets/user-preferences/setEmail.css';

import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { updateUserInfo } from '../../actions/userUpdate';
import { setWorkoutError } from '../../actions/workoutsDelete';

class SetEmail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event){
    event.preventDefault();
    const newEmail = event.target.newEmail.value;
    if(newEmail.trim() !== newEmail){
      this.props.dispatch(setWorkoutError('Email address should not contain whitespace'));
    } else {
      this.setState({submitted: true}, () => {
        this.props.dispatch(updateUserInfo({email: newEmail}));
      })
    }
  }

  render(props){  
    if(this.state.submitted){
      return <Redirect to='/profile'/>
    }

    let message;
    const currentEmail = this.props.currentUser.email;

    if(currentEmail){
      message = <p>Your current email address is <span className='current-email'>{currentEmail} .</span></p>
    } else {
      message = <p>You currently have no email address on record.</p>
    }

    return (
      <div className='set-email'>
        <h2>Change email</h2>

        <form id='changeEmail' name='changeEmail' onSubmit={e => this.handleSubmit(e)}>
          {message}
          <label htmlFor='newEmail'>Enter email address to update our records:</label>
          <div className='input-row'>
            <input type='email' id='newEmail' placeholder='e.g. foo@bar.com' required/>
          </div>

          <div className='button-container'>
            <button type='submit'>Update Email</button>
            <Link to='/profile'>
              <button type='reset'>Nevermind...</button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  workoutError: state.auth.workoutError
})

export default connect(mapStateToProps)(SetEmail);