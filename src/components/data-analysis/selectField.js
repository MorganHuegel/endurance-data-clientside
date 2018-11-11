import React from 'react';
import AllFieldsSelect from './allFieldsSelect';

export default function SelectField(props) {
  return (
    <form id='da-select-field' name='da-select-field' onSubmit={e => props.handleSelectField(e)}>
      <p>Check my <AllFieldsSelect selected={props.selected}/> over the past 30 days.</p>
      <div>
        <button type='submit'>See Data</button>
      </div>
    </form>
  )
}