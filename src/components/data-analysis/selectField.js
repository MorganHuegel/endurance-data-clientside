import React from 'react';
import AllFieldsSelect from './allFieldsSelect';

export default function SelectField(props) {
  return (
    <form id='da-select-field' name='da-select-field' onSubmit={e => props.handleSelectField(e)}>
      <p>Check my<AllFieldsSelect selected={props.selected}/>over the past 
        <select name='select-numDays'>
          <option value='30'>30</option>
          <option value='60'>60</option>
        </select>
      days.</p>

      <div>
        <button type='submit'>See Data</button>
      </div>

      <div className='off-days-container'>
        <input type='checkbox' name='off-days' id='off-days'
          onChange={e => props.handleCheckOffDays(e)}
        />
        <label htmlFor='off-days'>Include off-days</label>
      </div>

    </form>
  )
}