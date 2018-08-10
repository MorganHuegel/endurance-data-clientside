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

    this.viewSingleWorkout = this.viewSingleWorkout.bind(this);
    this.backToWorkoutList = this.backToWorkoutList.bind(this);
    this.toggleDeleteScreen = this.toggleDeleteScreen.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.toggleAddState = this.toggleAddState.bind(this);
    this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this);
    this.toggleEditState = this.toggleEditState.bind(this);
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
  }

  viewSingleWorkout(id){
    const currentWorkout = this.props.currentUser.workouts.find(workout => workout.id === id);
    this.setState({currentWorkout, viewingWorkout: true});
  }

  backToWorkoutList(){
    this.setState({currentWorkout: null, viewingWorkout: false});
  }

  toggleDeleteScreen(bool){
    this.setState({deletingWorkout: bool});
  }

  confirmDelete(){
    const workoutId = this.state.currentWorkout.id;
    this.setState({
      deletingWorkout: false, 
      currentWorkout: null,
      viewingWorkout: false
    }, //callback action to delete from database and delete from redux state
      () => this.props.dispatch(deleteWorkoutDatabase(workoutId))
    )
  }

  toggleAddState(bool){
    this.setState({addingWorkout: bool});
  }

  handleAddFormSubmit(workoutObj){
    this.setState({
      addingWorkout: false,
      currentWorkout: null,
      editingWorkout: false,
      viewingWorkout: false,
      deletingWorkout: false
    }, () => {   //callback action to add workout to database and redux state
      this.props.dispatch(addWorkoutDatabase(workoutObj));
    })
  }

  toggleEditState(bool){
    this.setState({editingWorkout: bool})
  }

  handleEditFormSubmit(workoutObj){
    this.setState({
      addingWorkout: false,
      editingWorkout: false,
      viewingWorkout: true,
      deletingWorkout: false
    }, () => {
      this.props.dispatch(editWorkoutDatabase(workoutObj))
    }
  )}

  addFormOption = (fieldArray) => {
    this.setState({formOptions: fieldArray})
  }

  deleteFormOption = () => {

  }

  render(props){
    if(this.state.addingWorkout){
      return <AddWorkout 
                toggleAddState={this.toggleAddState}
                currentUser={this.props.currentUser}
                handleAddFormSubmit={this.handleAddFormSubmit}
                dispatch={this.props.dispatch}
                formOptions={this.state.formOptions}
                addFormOption={this.addFormOption}
              />

    } else if (this.state.editingWorkout) {
      return <EditWorkout
                currentWorkout={this.state.currentWorkout}
                toggleEditState={this.toggleEditState}
                handleEditFormSubmit={this.handleEditFormSubmit}
                formOptions={this.state.formOptions}
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