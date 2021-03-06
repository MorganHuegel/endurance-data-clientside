import '../../stylesheets/user-preferences/profile.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile(){
  return(
    <div className='profile'>
      <h2>Profile Settings</h2>
        <div className='link-container'>
          <Link to='/profile/preferences'>
            <span>Change my default preferences</span>
          </Link>
        </div>

        <div className='link-container'>
          <Link to='/profile/password'>
            <span>Change my password</span>
          </Link>
        </div>

        <div className='link-container'>
          <Link to='/profile/username'>
            <span>Change my username</span>
          </Link>
        </div>

        <div className='link-container'>
          <Link to='/profile/email'>
            <span>Change my email</span>
          </Link>
        </div>

        <div className='link-container'>
          <Link to='/profile/logout'>
            <span>Logout</span>
          </Link>
        </div>
    </div>
  );
}

