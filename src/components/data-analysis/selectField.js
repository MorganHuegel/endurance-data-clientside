import React from 'react';
import AllFieldsSelect from './allFieldsSelect';

export default function SelectField(props) {
  return (
    <form id='da-select-field' name='da-select-field'>
      <p>Check my<AllFieldsSelect selected={props.selected} handleChangeSelectedField={props.handleChangeSelectedField}/>
        over the past<select name='select-numDays' onChange={e => props.handleChangeNumDays(e)}>
          <option value='30'>30</option>
          <option value='60'>60</option>
        </select>
      days.</p>

      <div className='off-days-container'>
        <input type='checkbox' name='off-days' id='off-days'
          onChange={e => props.handleCheckOffDays(e)}
        />
        <label htmlFor='off-days'>Include off-days</label>
      </div>

    </form>
  )
}