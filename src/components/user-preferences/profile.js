import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile(){
  return(
    <div>
      <h2>Profile Settings</h2>
        <div>
          <Link to='/profile/preferences'>
            <span>Change my default preferences</span>
          </Link>
        </div>

        <div>
          <Link to='/profile/password'>
            <span>Change my password</span>
          </Link>
        </div>

        <div>
          <Link to='/profile/username'>
            <span>Change my username</span>
          </Link>
        </div>

        <div>
          <Link to='/profile/email'>
            <span>Change my email</span>
          </Link>
        </div>

        <div>
          <Link to='/profile/logout'>
            <span>Logout</span>
          </Link>
        </div>
    </div>
  );
}

export default connect()(Profile);