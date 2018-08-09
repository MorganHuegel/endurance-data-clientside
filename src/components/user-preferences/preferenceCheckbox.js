import React from 'react';

export default function PreferenceCheckbox(props){

  return(
    <div>
      <input type='checkbox' id={props.value} value={props.value}
        onChange={e => props.handleCheck(e)} />
      <label htmlFor={props.value}>
        {props.displayedValue} <span className='sidenote'>{props.sidenote}</span>
      </label>
    </div>
  )
}