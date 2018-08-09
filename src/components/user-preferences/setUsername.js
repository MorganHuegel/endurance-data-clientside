import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { updateUserInfo } from '../../actions/userUpdate';
import { setWorkoutError } from '../../actions/workoutsDelete';

class SetUsername extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
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

  render(props){  
    if(this.state.submitted){
      return <Redirect to='/profile'/>
    }

    const currentUsername = this.props.currentUser.username;
    let message = <p>Hi {currentUsername}!</p> ;

    return (
      <div>
        <h3>Change username</h3>
        {this.props.workoutError}
        <form id='changeUsername' name='changeUsername' onSubmit={e => this.handleSubmit(e)}>
          {message}
          <label htmlFor='newUsername'>Enter a new username: </label>
          <input type='text' id='newUsername' placeholder='username' required/>

          <div>
            <button type='submit'>Update Username</button>
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

export default connect(mapStateToProps)(SetUsername);