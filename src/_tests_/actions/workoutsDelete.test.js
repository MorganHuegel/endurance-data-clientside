import { 
  DELETE_WORKOUT_LOCAL, deleteWorkoutLocal, 
  deleteWorkoutDatabase, 
  SET_WORKOUT_ERROR, setWorkoutError 
} from '../../actions/workoutsDelete';


describe('DELETE_WORKOUT_LOCAL action', () => {
  it('should return action', () => {
    const id = '000011112222333344445555';
    const action = deleteWorkoutLocal(id);
    expect(action.type).toEqual(DELETE_WORKOUT_LOCAL);
    expect(action.workoutId).toEqual(id);
  });
});

describe('SET_WORKOUT_ERROR action', () => {
  it('should return action', () => {
    const errMessage = 'TEST ERROR';
    const action = setWorkoutError(errMessage);
    expect(action.type).toEqual(SET_WORKOUT_ERROR);
    expect(action.errMessage).toEqual(errMessage);
  });
});

describe('DELETE WORKOUT DATABASE Asynch action', () => {

});