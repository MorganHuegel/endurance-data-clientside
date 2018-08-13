import '../../stylesheets/workouts/workouts.css';

import React from 'react';
import { connect } from 'react-redux';

import { deleteWorkoutDatabase } from '../../actions/workoutsDelete';
import { addWorkoutDatabase } from '../../actions/workoutsAdd';
import { editWorkoutDatabase } from '../../actions/workoutsEdit';

import WorkoutList from './workoutList';
import SingleWorkout from './singleWorkout';
import SingleWorkoutDelete from './singleWorkoutDelete';
import AddWorkout from './addNewWorkout';
import EditWorkout from './singleWorkoutEdit';

class Workouts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addingWorkout: false,
      currentWorkout: null,
      editingWorkout: false,
      viewingWorkout: false,
      deletingWorkout: false,
      formOptions: []
    }
  }

  viewSingleWorkout = (id) => {
    const currentWorkout = this.props.currentUser.workouts.find(workout => workout.id === id);
    this.setState({currentWorkout, viewingWorkout: true});
  }

  backToWorkoutList = () => {
    this.setState({currentWorkout: null, viewingWorkout: false});
  }

  toggleDeleteScreen = (bool) => {
    this.setState({deletingWorkout: bool});
  }

  confirmDelete = () => {
    const workoutId = this.state.currentWorkout.id;
    this.setState({
      deletingWorkout: false, 
      currentWorkout: null,
      viewingWorkout: false
    }, //callback action to delete from database and delete from redux state
      () => this.props.dispatch(deleteWorkoutDatabase(workoutId))
    )
  }

  toggleAddState = (bool) => {
    if(bool === false){
      this.setState({addingWorkout: bool, formOptions: []});
    } else {
      this.setState({addingWorkout: bool});
    }
  }

  handleAddFormSubmit = (workoutObj) => {
    this.setState({
      addingWorkout: false,
      currentWorkout: null,
      editingWorkout: false,
      viewingWorkout: false,
      deletingWorkout: false,
      formOptions: []
    }, () => {   //callback action to add workout to database and redux state
      this.props.dispatch(addWorkoutDatabase(workoutObj));
    })
  }

  toggleEditState = (bool) => {
    this.setState({editingWorkout: bool})
  }

  handleEditFormSubmit = (workoutObj) => {
    this.setState({
      addingWorkout: false,
      editingWorkout: false,
      viewingWorkout: true,
      deletingWorkout: false,
      formOptions: []
    }, () => {
      this.props.dispatch(editWorkoutDatabase(workoutObj))
    }
  )}

  changeFormOptions = (fieldArray, action) => {
    if(fieldArray[0] === ''){ //if they try to add the empty string option
      return;
    } else if (action === 'ADD'){
      return this.setState({formOptions: [
        ...this.state.formOptions, 
        ...fieldArray
      ]})
    } else if (action === 'DELETE'){
      const filteredFormOptions = this.state.formOptions.filter(field => field !== fieldArray[0]);
      return this.setState({formOptions: filteredFormOptions});
    }
  }

  render(props){
    if(this.state.addingWorkout){
      return <AddWorkout 
                toggleAddState={this.toggleAddState}
                currentUser={this.props.currentUser}
                handleAddFormSubmit={this.handleAddFormSubmit}
                dispatch={this.props.dispatch}
                formOptions={this.state.formOptions}
                changeFormOptions={this.changeFormOptions}
              />

    } else if (this.state.editingWorkout) {
      return <EditWorkout
                currentWorkout={this.state.currentWorkout}
                toggleEditState={this.toggleEditState}
                handleEditFormSubmit={this.handleEditFormSubmit}
                formOptions={this.state.formOptions}
                changeFormOptions={this.changeFormOptions}              
              />
    
    
    } else if (this.state.deletingWorkout){
      return <SingleWorkoutDelete 
                currentWorkout={this.state.currentWorkout} 
                confirmDelete={this.confirmDelete}
                toggleDeleteScreen={this.toggleDeleteScreen}
              />
      
    } else if (this.state.viewingWorkout){
      return <SingleWorkout 
                currentWorkout={this.state.currentWorkout}
                backToWorkoutList={this.backToWorkoutList}
                toggleDeleteScreen={this.toggleDeleteScreen}
                toggleEditState={this.toggleEditState}
              />

    } else {
      return <WorkoutList 
                currentUser={this.props.currentUser} 
                viewSingleWorkout={this.viewSingleWorkout}
                toggleAddState={this.toggleAddState}
              />
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