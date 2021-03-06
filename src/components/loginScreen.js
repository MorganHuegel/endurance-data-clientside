import '../stylesheets/loginScreen.css';
import React from 'react';

import LoginForm from './loginForm';
import RegisterForm from './registerForm';

export default function LoginScreen(props){

  return (
    <div className='login-screen'>
      <LoginForm loginError={props.loginError}/>
      <RegisterForm registerError={props.registerError}/>
    </div>
  );
}