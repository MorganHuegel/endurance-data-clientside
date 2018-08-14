import '../../stylesheets/user-preferences/confirmLogout.css';

import React from 'react';
import { Redirect } from 'react-router-dom';
import { changeUserFail } from '../../actions/register-user';
import { connect } from 'react-redux';

class ConfirmLogout extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      confirmed: false,
      nevermind: false
    }
  }


  render(props){
    if(this.state.confirmed){
      return <Redirect from='/profile/logout' to='/'/>
    } else if (this.state.nevermind){
      return <Redirect from='/profile/logout' to='/profile'/>
    } else {
      return (
        <div className='confirm-logout'>
          <p>Are you sure you want to logout?</p>

          <div className='button-container'>
            <button type='button' onClick={e => {
              localStorage.removeItem('authToken');
              this.setState({confirmed: true}, () => {
                this.props.dispatch(changeUserFail({message: 'Logout Successful', code: null}, 'login'));
              })
            }} className='logout button'>Yes, Logout</button>


            <button type='button' onClick={e => {
              this.setState({nevermind: true});
            }} className='back button'>No, stay logged in</button>
          </div>
        </div>
      )
    }
  }
}

export default connect()(ConfirmLogout);