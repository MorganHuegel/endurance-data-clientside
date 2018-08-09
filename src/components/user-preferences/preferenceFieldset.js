import React from 'react';
import PreferenceCheckbox from './preferenceCheckbox';

export default function PreferenceFieldset(props) {

  const checkboxes = props.inputs.map(field => {
    return <PreferenceCheckbox
      key={field.value}
      value={field.value}
      displayedValue={field.displayedValue}
      sidenote={field.sidenote}
      handleCheck={props.handleCheck} />
  });

  return(
    <fieldset name={props.name} form='preferenceForm' id={props.name}>
      <legend>{props.displayName}</legend>

      {checkboxes}

    </fieldset>
  )
}