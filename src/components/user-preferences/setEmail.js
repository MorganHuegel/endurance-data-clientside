import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { updateUserInfo } from '../../actions/userUpdate';

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
    this.setState({submitted: true}, () => {
      this.props.dispatch(updateUserInfo({email: newEmail}));
    })
  }

  render(props){  
    if(this.state.submitted){
      return <Redirect to='/profile'/>
    }

    let message;
    const currentEmail = this.props.currentUser.email;

    if(currentEmail){
      message = <p>Your current email address is {currentEmail}.</p>
    } else {
      message = <p>You currently have no email address on record.</p>
    }

    return (
      <div>
        <h3>Change email</h3>
        {this.props.workoutError}

        <form id='changeEmail' name='changeEmail' onSubmit={e => this.handleSubmit(e)}>
          {message}
          <label htmlFor='newEmail'>Enter email address to update our records:</label>
          <input type='email' id='newEmail' placeholder='e.g. foo@bar.com' required/>

          <div>
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