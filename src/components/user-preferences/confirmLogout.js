import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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
        <div>
          <p>Are you sure you want to logout?</p>
          <button type='button' onClick={e => {
            localStorage.removeItem('authToken');
            this.setState({confirmed: true}, () => {
              this.props.dispatch(changeUserFail({message: 'Logout Successful', code: null}, 'login'));
            })
          }}>Yes, Logout</button>

          <Link to='/profile'>
            <button type='button' onClick={e => {
              this.setState({nevermind: true});
            }}>No, stay logged in</button>
          </Link>
        </div>
      )
    }
  }
}

export default connect()(ConfirmLogout);