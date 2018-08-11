export default function formatDisplayName(field){
  switch (field) {
    case 'totalDistance':
      return 'Total Distance';
    case 'totalTime':
      return 'Total Time'
    case 'averagePace':
      return 'Average Pace'
    case 'maximumPace':
      return 'Max Pace'
    case 'averageWatts':
      return 'Average Watts'
    case 'maximumWatts':
      return 'Maximum Watts'
    case 'totalElevation':
      return 'Total Elevation'
    case 'averageHeartrate':
      return 'Average Heartrate'
    case 'maxHeartrate':
      return 'Max Heartrate'
    case 'tss':
      return 'TSS'
    case 'minutesStretching':
      return 'Time Stretching'
    case 'minutesFoamRollingMassage':
      return 'Time Foam Rolling'
    case 'minutesCore':
      return 'Time Core Work'
    case 'injuryRating':
      return 'Injury Rating (1-10)'
    case 'sorenessRating':
      return 'Soreness Rating (1-10)'
    case 'stressRating':
      return 'Stress Rating (1-10)'
    case 'bodyWeight':
      return 'Body Weight'
    case 'dietRating':
      return 'Diet Rating (1-10)'
    case 'hoursOfSleep':
      return 'Hours of Sleep'
    case 'waterDrank':
      return 'Water Drank'
    case 'notes':
      return 'Notes'
    default:
      return;
  }
};