import React from 'react';
import LoginScreen from './loginScreen';
import Dashboard from './dashboard';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit'

const App = function(props){

  let mainContent;

  if(props.loading === true){
    mainContent = <Spinner name='wordpress' fadeIn='none' />

  } else if (!props.currentUser){
    mainContent = <LoginScreen registerError={props.registerError} loginError={props.loginError}/>

  } else {
    mainContent = <Dashboard currentUser={props.currentUser}/>
  }
  
  return (
    <div>
      <header role='banner'>
        <h1>Workout The Data</h1>
      </header>

      <main role='main'>
        {mainContent}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    currentUser: state.auth.currentUser,
    registerError: state.auth.registerError,
    loginError: state.auth.loginError
  }
}

export default connect(mapStateToProps)(App);