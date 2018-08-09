import React from 'react';
import { connect } from 'react-redux';

import WorkoutList from './workoutList';

class Workouts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addingWorkout: false,
      currentWorkout: null,
      editingWorkout: false,
      viewingWorkout: false,
      deletingWorkout: false
    }
  }

  render(props){
    if(this.state.addingWorkout){
      // return <AddWorkout /> ;

    } else if (this.state.editingWorkout) {
      // return <EditWorkout currentWorkout={this.state.currentWorkout} />
      
    } else if (this.state.viewingWorkout){
      // return <SingleWorkout currentWorkout={this.state.currentWorkout} />

    } else if (this.state.deletingWorkout){
      // return <DeleteWorkout currentWorkout={this.state.currentWorkout} />

    } else {
      return <WorkoutList currentUser={this.props.currentUser}/>
    }
  }
}


const mapStateToProps = (state, props) => {
  return{
    currentUser: state.auth.currentUser,
    workoutError: state.auth.workoutError
  }
}

export default connect(mapStateToProps)(Workouts);