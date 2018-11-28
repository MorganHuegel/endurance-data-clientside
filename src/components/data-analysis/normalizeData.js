export function convertDataUnits (workoutData, selectedField) {
  // Makes sure it doensn't edit the original data by normalizing
  const workouts = workoutData.map(workout => {
    let workoutCopy = {};
    Object.keys(workout).forEach(field => {
      if (field instanceof Object) {
        workoutCopy[field] = Object.assign({}, workout[field]);
      } else {
        workoutCopy[field] = workout[field];
      }
    });
    return workoutCopy;
  });

  // Makes sure Units are standardized
  if (!selectedField) return workoutData;
  switch (selectedField) {
    case ('totalDistance'): // convert to miles
      return workouts.map(workout => {
        if (workout.totalDistance && workout.totalDistance.unit === 'km') {
          const km = workout.totalDistance.amount;
          const miles = km / 1.609;
          workout.totalDistance = Object.assign({}, {
            amount: miles, 
            unit: 'miles'
          });
        }

        return workout;
      });

    case('totalTime'): // convert to minutes
      return workouts.map(workout => {
        if (workout.totalTime && workout.totalTime.unit === 'hours') {
          const hours = workout.totalTime.amount;
          const minutes = hours * 60;
          workout.totalTime = Object.assign({}, {
            amount: minutes,
            unit: 'minutes'
          });
        }

        return workout;
      });

    case('averagePace'): // convert to min/mile
      return workouts.map(workout => {
        if (workout.averagePace && workout.averagePace.unit === 'min/mile') {
          const minPerMile = workout.averagePace.amount;
          const mph = 1 / minPerMile * 60;
          workout.averagePace = Object.assign({}, {
            amount: mph,
            unit: 'mph'
          });
        }
        return workout;
      });

    case('maximumPace'): // convert to min/mile
      return workouts.map(workout => {
        if (workout.maximumPace && workout.maximumPace.unit === 'min/mile') {
          const minPerMile = workout.maximumPace.amount;
          const mph = 1 / minPerMile * 60;
          workout.maximumPace = Object.assign({}, {
            amount: mph,
            unit: 'mph'
          });
        }
        return workout;
      });

    case('totalElevation'):
      return workouts.map(workout => {
        if (workout.totalElevation && workout.totalElevation.unit === 'meters') {
          const meters = workout.totalElevation.amount;
          const feet = meters * 3.28084;
          workout.totalElevation = Object.assign({}, {
            amount: feet,
            unit: 'feet'
          });
        }
        return workout;
      });
    case('waterDrank'):
      return workouts.map(workout => {
        if (workout.waterDrank && workout.waterDrank.unit === 'cups') {
          const cups = workout.waterDrank.amount;
          const ounces = cups * 8;
          workout.waterDrank = Object.assign({}, {
            amount: ounces,
            unit: 'ounces'
          });
        }
        else if (workout.waterDrank && workout.waterDrank.unit === 'liters') {
          const liters = workout.waterDrank.amount;
          const ounces = liters * 33.814;
          workout.waterDrank = Object.assign({}, {
            amount: ounces,
            unit: 'ounces'
          });
        } else if (workout.waterDrank && workout.waterDrank.unit === 'gallons') {
          const gal = workout.waterDrank.amount;
          const ounces = gal * 128;
          workout.waterDrank = Object.assign({}, {
            amount: ounces,
            unit: 'ounces'
          });
        }

        return workout;
      });
    default:
      return workouts;
  }
}
