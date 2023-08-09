import React, { useState } from "react";
import { connect } from "react-redux";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Component receives a string and as a result filters rows that contain that string in columns that the user checks
// Fields are columns in which we're searching the word we write in input
const SearchComponent = ({ fields, rows, setShownRows }) => {
  const [fieldsForFiltering, setFieldsForFiltering] = useState(fields.map((x) => { return {field: x, isSelected: true} }));
  const [searchBy, setSearchBy] = useState("");

  // See if a given row contains wantedString in any of the checked columns
  // Iterate through columns, see if it's checked and if the given row
  const filterBySearch = (row: any, wantedWord: string) => {
    return fieldsForFiltering.reduce((acc: boolean, curr: any) => 
                                          (curr.isSelected && row[curr.field].includes(wantedWord)) || acc, false);
  };

  const handleCheckChange = (event: any) => {
    const newFieldsForFiltering = fieldsForFiltering;
    fieldsForFiltering[event.target.id].isSelected = event.target.checked;
    setFieldsForFiltering(newFieldsForFiltering);
  };

  const handleChangeSearch = (event: any) => {
    setSearchBy(event.target.value);
  };

  // On submit, iterate through rows and try to find given string
  // Rows that contain wanted string are set to be shownRows
  // Uses filterBySearch
  const handleSubmitSearch = (event: any) => {
    setShownRows(rows.filter(x => filterBySearch(x, searchBy)));
  };


  return (
    <>
      <label>What do you want to find?</label>
      <input name="search" id="search" required  onChange={handleChangeSearch}/>
      <button type="submit" value="Submit" onClick={handleSubmitSearch}>Search</button>
      <FormGroup>
        {fields.map((field, index) => {
            return (
              <FormControlLabel key={index}
                              control={<Checkbox id={index} defaultChecked onChange={handleCheckChange}/>} label={field} />
            );
        })}
      </FormGroup>
    </>
  );
};

export default connect(null, null)(SearchComponent);
