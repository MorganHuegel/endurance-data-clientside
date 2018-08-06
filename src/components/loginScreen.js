import React from 'react';
//import {Field} from 'redux-form';

import LoginForm from './loginForm';
import RegisterForm from './registerForm';

export default function LoginScreen(props){
  return (
    <div>
      <LoginForm loginError={props.loginError}/>
      <RegisterForm registerError={props.registerError}/>
    </div>
  );
}