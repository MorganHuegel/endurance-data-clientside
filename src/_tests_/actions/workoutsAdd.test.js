import { ADD_WORKOUT_LOCAL, addWorkoutLocal, addWorkoutDatabase } from '../../actions/workoutsAdd';

describe.only('ADD_WORKOUT_LOCAL action', () => {
  it('should return the action', () => {
    const workoutObj = {
      date: 'March 2011',
      totalTime: {amount: 60, unit: 'minutes'},
      totalDistance: {amount: 8, unit: 'miles'},
      hoursOfSleep: 10
    }
    const action = addWorkoutLocal(workoutObj);
    expect(action.type).toEqual(ADD_WORKOUT_LOCAL);
    expect(action.workoutObj).toEqual(workoutObj);
  })
});

describe('ADD WORKOUT DATABASE Asynch action', () => {
  
});