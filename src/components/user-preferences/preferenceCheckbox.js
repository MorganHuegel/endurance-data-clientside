import React from 'react';

export default function PreferenceCheckbox(props){
  let checked = ' ';

  if(props.selectedFields.includes(props.value)){
    checked = 'checked';
  }

  return(
    <div className='checkbox-container'>
      <span className={`checkbox-span ${checked}`}>
        <input type='checkbox' id={props.value} value={props.value}
          onChange={e => props.handleCheck(e)} />
        <label htmlFor={props.value}>
          {props.displayedValue} <span className='sidenote'>{props.sidenote}</span>
        </label>
      </span>
    </div>
  )
}