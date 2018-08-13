import runningLogo from '../running-logo.png';
import cyclingLogo from '../cycling-logo.png';

import React from 'react';
import LoginScreen from './loginScreen';
import Dashboard from './dashboard';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit'
import { getWorkouts } from '../actions/workoutsGet';

class App extends React.Component {
  componentWillMount(){
    if(localStorage.getItem('authToken') ){
      this.props.dispatch(getWorkouts());
    }
  }

  render(props){
    let mainContent;

    if(this.props.loading === true){
      mainContent = <Spinner name='wordpress' fadeIn='none' />
      
    } else if (!this.props.currentUser || this.props.registerError || this.props.loginError){
      mainContent = <LoginScreen registerError={this.props.registerError} loginError={this.props.loginError}/>

    } else {
      mainContent = <Dashboard currentUser={this.props.currentUser} workoutError={this.props.workoutError}/>
    }
    
    return (
      <div>
        <header role='banner'>
          <img src={runningLogo} alt='Logo of runner' className='logo running'/>
          <h1>Endurance Data</h1>
          <img src={cyclingLogo} alt='Logo of cyclist' className='logo cycling'/>
        </header>

        <main role='main'>
          {mainContent}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    currentUser: state.auth.currentUser,
    registerError: state.auth.registerError,
    loginError: state.auth.loginError,
    workoutError: state.auth.workoutError
  }
}

export default connect(mapStateToProps)(App);