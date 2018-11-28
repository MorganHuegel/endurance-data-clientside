import moment from 'moment';
import { select } from 'd3-selection';

export function changeGraph (data, numDays, selectedField) {
  document.getElementsByClassName('da-graph')[0].innerHTML = ''; // Resets the graph
  appendGraphContainer();
  const recentWorkouts = getRecentWorkouts(data, numDays, selectedField);
  if (recentWorkouts.length === 0) {
    handleNoData(numDays);
    return false;
  }
  const pxPerYValue = drawHorizontalGrid(recentWorkouts, selectedField);
  const pxPerXValue = drawVerticalGrid(numDays);
  drawAverage(recentWorkouts, pxPerYValue, selectedField, numDays);
  drawDataPoints(recentWorkouts, pxPerXValue, pxPerYValue, selectedField, numDays);
  return true;
}




function getRecentWorkouts (workoutData, numDays, selectedField) {
  return workoutData.filter(workout => {
    const now = Number(moment(moment().format('YYYY MMM D'), 'YYYY MMM D').format('x'));
    const workoutDate = Number(moment(workout.date).format('x'));
    return (now - workoutDate <= 1000 * 60 * 60 * 24 * numDays) && (workout[selectedField]);
  });
};



function handleNoData (numDays) {
  const svg = document.getElementsByClassName('da-graph')[0];
  const graphHeight = svg.getBoundingClientRect().height;
  const graphWidth = svg.getBoundingClientRect().width;
  select(svg)
    .append('text')
    .text(`No data for selected field`)
    .attr('x', () => {
      if (window.innerWidth < 700) return graphWidth / 2 - 88;
      else return graphWidth / 2 - 112;
    })
    .attr('y', () => graphHeight / 2)
    .attr('class', 'no-data-message')

  select(svg)
    .append('text')
    .text(`for the past ${numDays} days.`)
    .attr('x', () => {
      if (window.innerWidth < 700) return graphWidth / 2 - 73;
      else return graphWidth / 2 - 90;
    })
    .attr('y', () => graphHeight / 2 + 30)
    .attr('class', 'no-data-message')
}




function appendGraphContainer () {
  const svg = document.getElementsByClassName('da-graph')[0];
  const graphHeight = svg.getBoundingClientRect().height;
  const graphWidth = svg.getBoundingClientRect().width;
  if (window.innerWidth < 700) {
    select(svg)
      .append('polygon')
      .attr('points', `0,0 ${graphWidth},0 ${graphWidth},${graphHeight - 80} 0,${graphHeight - 80}`)
      .attr('fill', 'white');
  } else {
    select(svg)
      .append('polygon')
      .attr('points', `30,30 ${graphWidth - 30},30 ${graphWidth - 30},${graphHeight - 80} 30,${graphHeight - 80}`)
      .attr('fill', 'white');
  }
}




function drawHorizontalGrid (data, selectedField) {
  // Grab the svg and height
  const svg = document.getElementsByClassName('da-graph')[0];
  const graphContainer = document.getElementsByTagName('polygon')[0];
  const graphHeight = graphContainer.getBoundingClientRect().height;

  // Find the highest data value
  let maxValue = data[0][selectedField].amount ? data[0][selectedField].amount : data[0][selectedField];
  for (let i = 0; i < data.length; i++) {
    const value = data[i][selectedField].amount ? data[i][selectedField].amount : data[i][selectedField];
    if (value > maxValue) maxValue = value;
  }

  // Calculate what to count by
  const axisInterval = Math.floor(maxValue / 10) > 0 ? 
    Math.floor(maxValue / 10) : 
    0.5;

  // Calculate how many lines it will take to get above the max value
  let numLines = 0;
  while (numLines * axisInterval < maxValue) {
    numLines++;
  }

  // Assume 11 lines
  const pxPerLine = graphHeight / numLines;

  for(let i = 0; i <= numLines; i++){
    select(svg)
      .append('rect')
      .attr('width', () => {
        if (window.innerWidth < 700) return '100%';
        else return 'calc(100% - 60px)';
      })
      .attr('height', '1px')
      .attr('y', () => {
        if (window.innerWidth < 700) return pxPerLine * i;
        else return `calc(${pxPerLine * i} + 30px)`;
      })
      .attr('x', () => {
        if (window.innerWidth < 700) return '0';
        else return '30px';
      });
    
    // For small screens, only label every-other y-axis label
    if (window.innerWidth < 500 && i % 2 === 0) continue;

    select(svg)
      .append('text')
      .text(() => {
        if (window.innerWidth < 700 && i === numLines) return;
        else if (window.innerWidth < 700) return (numLines - i) * axisInterval;
        else return (numLines - i) * axisInterval;
      })
      .attr('y', () => {
        if (window.innerWidth < 700) return pxPerLine * i;
        else return pxPerLine * i + 34;
      })
      .attr('x', () => {
        if (window.innerWidth < 700) return 0;
        else return 10;
      })
      .attr('class', 'y-axis');
  }

  const pxPerValue = graphHeight / (numLines * axisInterval); // height divided by graph maximum possible value
  return pxPerValue; // pixels per 1 unit of measure, NOT pixels per line
}




function drawVerticalGrid (numDays) {
  const svg = document.getElementsByClassName('da-graph')[0];
  const graphContainer = document.getElementsByTagName('polygon')[0];
  const graphWidth = graphContainer.getBoundingClientRect().width;
  const graphHeight = graphContainer.getBoundingClientRect().height;

  const pxPerLine = graphWidth / numDays;
  for (let i = 0; i <= numDays; i++) {
    select(svg)
      .append('rect')
      .attr('width', '1px')
      .attr('height', graphHeight)
      .attr('x', () => {
        if (window.innerWidth < 700) return i * pxPerLine;
        else return i * pxPerLine + 30;
      })
      .attr('y', () => {
        if (window.innerWidth < 700) return 0;
        else return 30;
      })
  }

  let pxPerLabel = pxPerLine;

  const currentMidnight = moment(moment().format('MMM D YYYY'), 'MMM D YYYY').format('x');
  const xLabels = [];
  for (let i = 0; i <= numDays; i++) {
    switch (true) {
      case (numDays === 30 && window.innerWidth < 700): // Small screen -> label every fourth date
        pxPerLabel = pxPerLine * 4;
        if (i % 4 === 0) xLabels.unshift(moment(Number(currentMidnight) - (numDays * 1000 * 60 * 60 * 24) + (i * 1000 * 60 * 60 * 24), 'x').format('ddd MMM D'));
        break;
      case (numDays === 30 && window.innerWidth < 1000): // Medium screen -> label every other date
        pxPerLabel = pxPerLine * 2;
        if (i % 2 === 0) xLabels.unshift(moment(Number(currentMidnight) - (numDays * 1000 * 60 * 60 * 24) + (i * 1000 * 60 * 60 * 24), 'x').format('ddd MMM D'));
        break;
      case (numDays === 60 && window.innerWidth < 700):
        pxPerLabel = pxPerLine * 7;
        if (i % 7 === 0) xLabels.unshift(moment(Number(currentMidnight) - (numDays * 1000 * 60 * 60 * 24) + (i * 1000 * 60 * 60 * 24), 'x').format('ddd MMM D'));
        break;
      case (numDays === 60 && window.innerWidth < 1000):
        pxPerLabel = pxPerLine * 4;
        if (i % 4 === 0) xLabels.unshift(moment(Number(currentMidnight) - (numDays * 1000 * 60 * 60 * 24) + (i * 1000 * 60 * 60 * 24), 'x').format('ddd MMM D'));
        break;
      case (numDays === 60):
        pxPerLabel = pxPerLine * 2;
        if (i % 2 === 0) xLabels.unshift(moment(Number(currentMidnight) - (numDays * 1000 * 60 * 60 * 24) + (i * 1000 * 60 * 60 * 24), 'x').format('ddd MMM D'));
        break;
      default:
        xLabels.unshift(moment(Number(currentMidnight) - (numDays * 1000 * 60 * 60 * 24) + (i * 1000 * 60 * 60 * 24), 'x').format('ddd MMM D'));
    }
  }

  // Append x-axis labels
  for(let i = 0; i < xLabels.length; i++) {
    select(svg)
      .append('text')
      .text(xLabels[xLabels.length - 1 - i])
      .attr('x', () => {
        if (i === 0 && window.innerWidth < 700) return i * pxPerLabel;
        if (window.innerWidth < 700) return i * pxPerLabel - 5;
        else return i * pxPerLabel + 25;
      })
      .attr('y', () => {
        if (window.innerWidth < 700) return graphHeight + 5;
        else return graphHeight + 40;
      })
      .attr('transform', () => {
        if (i === 0 && window.innerWidth < 700) return `rotate(70, ${i * pxPerLabel}, ${graphHeight + 5})`;
        if (window.innerWidth < 700) return `rotate(70, ${i * pxPerLabel - 5}, ${graphHeight + 5})`;
        else return `rotate(70, ${i * pxPerLabel + 25}, ${graphHeight + 40})`
      });
  }

  return pxPerLine;  
}


function drawAverage(data, pxPerYValue, selectedField, numDays) {
  let total = 0;
  data.forEach(workout => {
    const value = workout[selectedField].amount || workout[selectedField];
    total += value;
  });

  const average = total / numDays;
  const svg = document.getElementsByClassName('da-graph')[0];
  const graphContainer = document.getElementsByTagName('polygon')[0];
  const graphHeight = graphContainer.getBoundingClientRect().height;

  select(svg)
    .append('rect')
    .attr('width', () => {
      if (window.innerWidth < 700) return '100%';
      else return 'calc(100% - 60px)';
    })
    .attr('height', '1px')
    .attr('y', () => {
      if (window.innerWidth < 700) return graphHeight - (pxPerYValue * average);
      else return graphHeight - (pxPerYValue * average) + 30;
    })
    .attr('x', () => {
      if (window.innerWidth < 700) return '0';
      else return '30px';
    })
    .attr('class', 'average-line')
}


function drawDataPoints (data, pxPerXValue, pxPerYValue, selectedField, numDays) {
  const currentMidnight = moment(moment().format('MMM D YYYY'), 'MMM D YYYY').format('x');
  const earliestDate = Number(currentMidnight) - (1000 * 60 * 60 * 24 * numDays);

  const pxCoordinates = [];
  for (let i = 0; i <= numDays; i++) {
    const dateToCheck = earliestDate + (1000 * 60 * 60 * 24 * i);
    const workout = data.find(workout => Math.abs(
      Number(moment(workout.date).format('x')) - dateToCheck) < (1000 * 60 * 60 * 23)
    );
    if (workout) {
      const xValue = i * pxPerXValue;
      const datum = workout[selectedField].amount || workout[selectedField];
      const yValue = datum * pxPerYValue;
      pxCoordinates.push([xValue, yValue]);
    } else {
      pxCoordinates.push([i * pxPerXValue, 0])
    }
  }

  const svg = document.getElementsByClassName('da-graph')[0];
  const svgHeight = svg.getBoundingClientRect().height;
  for (let i = 0; i < pxCoordinates.length; i++) {
    select(svg)
      .append('circle')
      .attr('cx', () => {
        if (window.innerWidth < 700) return pxCoordinates[i][0];
        else return pxCoordinates[i][0] + 32;
      })
      .attr('cy', () => svgHeight - pxCoordinates[i][1] - 78)

    if (i < pxCoordinates.length - 1) {
      select(svg)
        .append('line')
        .attr('x1', () => {
          if (window.innerWidth < 700) return pxCoordinates[i][0];
          else return pxCoordinates[i][0] + 32;
        })
        .attr('y1', () => svgHeight - pxCoordinates[i][1] - 78)
        .attr('x2', () => {
          if (window.innerWidth < 700) return pxCoordinates[i + 1][0];
          else return pxCoordinates[i + 1][0] + 32;
        })
        .attr('y2', () => svgHeight - pxCoordinates[i + 1][1] - 78)
    }
  }
}