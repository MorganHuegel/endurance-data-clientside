import '../../stylesheets/user-preferences/setUsername.css';

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateUserInfo } from '../../actions/userUpdate';
import { setWorkoutError } from '../../actions/workoutsDelete';

export class SetUsername extends React.Component {
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
    const newUsername = event.target.newUsername.value;
    if(!newUsername){
      return this.props.dispatch(setWorkoutError('Username can\'t be blank'));
    } else if (newUsername.trim() !== newUsername){
      return this.props.dispatch(setWorkoutError('Username can\'t contain whitespace'));
    }
    this.setState({submitted: true}, () => {
      this.props.dispatch(updateUserInfo({username: newUsername}));
    })
  }

  handleReset(event){
    event.preventDefault();
    this.setState({submitted: true});
  }

  render(props){  
    if(this.state.submitted){
      return <Redirect to='/profile'/>
    }

    const currentUsername = this.props.currentUser.username;
    let message = <p>Hi <span className='current-username'>{currentUsername}</span> !</p> ;

    return (
      <div className='set-username'>
        <h2>Change username</h2>
        {message}
        <form id='changeUsername' name='changeUsername' onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='newUsername'>Enter a new username: </label>
          <div className='input-row'>
            <input type='text' id='newUsername' placeholder='username' required/>
          </div>

          <div className='button-container'>
            <button type='submit'>Update Username</button>
            <button type='reset' onClick={e => this.handleReset(e)}>Nevermind...</button>
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

export default connect(mapStateToProps)(SetUsername);