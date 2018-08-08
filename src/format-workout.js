import moment from 'moment';

export function formatWorkoutDisplay(field, workoutObj){
  const now = Date.now();

  switch (field) {
    case 'id':
      delete workoutObj['id'];
      return;
    case 'userId':
      delete workoutObj['userId'];
      return;
    case 'date':
      if( Math.abs(now - moment(workoutObj.date).format('x')) <= 1000 * 60 * 60 * 24 * 365 ){   // if date is not in the same year as current year, show the year on screen
        workoutObj.date = moment(workoutObj.date).format('MMMM Do, dddd');
        return;
      } else {
        workoutObj.date = moment(workoutObj.date).format('MMMM Do YYYY, dddd');
        return;
      }
    case 'totalDistance':
      workoutObj['Total Distance'] = `${workoutObj.totalDistance.amount} ${workoutObj.totalDistance.unit}`;
      delete workoutObj.totalDistance;
      return;
    case 'totalTime':
      workoutObj['Total Time'] = `${workoutObj.totalTime.amount} ${workoutObj.totalTime.unit}`;
      delete workoutObj.totalTime;
      return;
    case 'averagePace':
      workoutObj['Average Pace'] = `${workoutObj.averagePace.amount} ${workoutObj.averagePace.unit}`;
      delete workoutObj.averagePace;
      return;
    case 'averageWatts':
      workoutObj['Average Watts'] = `${workoutObj.averageWatts} watts`
      delete workoutObj.averageWatts;
      return;
    case 'maximumWatts':
      workoutObj['Max Watts'] = `${workoutObj.maximumWatts} watts`
      delete workoutObj.maximumWatts;
      return;
    case 'totalElevation':
      workoutObj['Total Elevation'] = `${workoutObj.totalElevation.amount} ${workoutObj.totalElevation.unit}`;
      delete workoutObj.totalElevation;
      return;
    case 'averageHeartrate':
      workoutObj['Average Heartrate'] = `${workoutObj.averageHeartrate} bpm`;
      delete workoutObj.averageHeartrate;
      return;
    case 'maxHeartrate':
      workoutObj['Max Heartrate'] = `${workoutObj.maxHeartrate} bpm`
      delete workoutObj.maxHeartrate;
      return;
    case 'tss':
      workoutObj['TSS'] = workoutObj.tss
      delete workoutObj.tss;
      return;
    case 'minutesStretching':
      workoutObj['Minutes Stretching'] = `${workoutObj.minutesStretching} min`;
      delete workoutObj.minutesStretching;
      return;
    case 'minutesFoamRollingMassage':
      workoutObj['Minutes Foam Rolling/Massage'] = `${workoutObj.minutesFoamRollingMassage} min`;
      delete workoutObj.minutesFoamRollingMassage;
      return;
    case 'minutesCore':
      workoutObj['Minutes of Core'] = `${workoutObj.minutesCore} min`;
      delete workoutObj.minutesCore;
      return;
    case 'injuryRating':
      workoutObj['Injury Rating'] = `${workoutObj.injuryRating} out of 10`;
      delete workoutObj.injuryRating;
      return;
    case 'sorenessRating':
      workoutObj['Soreness Rating'] = `${workoutObj.sorenessRating} out of 10`;
      delete workoutObj.sorenessRating;
      return;
    case 'stressRating':
      workoutObj['Stress Rating'] = `${workoutObj.stressRating} out of 10`;
      delete workoutObj.stressRating;
      return;
    case 'bodyWeight':
      workoutObj['Body Weight'] = `${workoutObj.bodyWeight} lbs`;
      delete workoutObj.bodyWeight;
      return;
    case 'dietRating':
      workoutObj['Diet Rating'] = `${workoutObj.dietRating} out of 10`;
      delete workoutObj.dietRating;
      return;
    case 'hoursOfSleep':
      workoutObj['Hours of Sleep'] = `${workoutObj.hoursOfSleep} hours`;
      delete workoutObj.hoursOfSleep;
      return;
    case 'waterDrank':
      workoutObj['Water Drank'] = `${workoutObj.waterDrank.amount} ${workoutObj.waterDrank.unit}`;
      delete workoutObj.waterDrank;
      return;
    case 'notes':
      workoutObj['Notes'] = workoutObj.notes;
      delete workoutObj.notes;
      return;
    default:
      return;
  }
}