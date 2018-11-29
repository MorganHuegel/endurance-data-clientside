import React from 'react';
import { fields } from '../user-preferences/preferenceForm';

export default function AllFieldsSelect(props) {
  const firstOption = props.selected ? 'Hide Graph' : 'Select Data';
  let options = [<option value='' default key=''>{firstOption}</option>];
  fields.forEach(group => {
    group.inputs.forEach(field => {
      if (field.value !== 'notes') {
        options.push(
          <option value={field.value} key={field.value}>{field.displayedValue}</option>
        );
      }
     
    });
  });

  return (
    <select id='select-field' name='select-field' onChange={e => props.handleChangeSelectedField(e)}>
      {options}
    </select>
  );
}