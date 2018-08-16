import { EDIT_WORKOUT_LOCAL, editWorkoutLocal, editWorkoutDatabase } from '../../actions/workoutsEdit';

describe('EDIT_WORKOUT_LOCAL action', () => {
  it('should return action', () => {
    const workoutObj = {
      date: 'March 2011',
      hoursOfSleep: 9, 
      totalTime: {amount: 20, unit: 'minutes'}
    };

    const action = editWorkoutLocal(workoutObj);
    expect(action.type).toEqual(EDIT_WORKOUT_LOCAL);
    expect(action.workoutObj).toEqual(workoutObj);
  })
});


describe('EDIT_WORKOUT_DATABASE Asynch action', () => {
  
});