import React from 'react';
import '../../stylesheets/data-analysis/graph.css';

import { changeGraph } from './graph-utils';

export default class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  }

  componentDidMount(){
    changeGraph(this.props.data, this.props.numDays, this.props.selectedField);
    window.addEventListener('resize', this.resizeWindow);
  }
  
  componentDidUpdate(){
    changeGraph(this.props.data, this.props.numDays, this.props.selectedField);
  }

  resizeWindow = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  render(){
    return (
      <figure>
        <figcaption>Your last 30 days of awesomeness</figcaption>
        <svg className='da-graph'></svg>
      </figure>
    )
  }  
}