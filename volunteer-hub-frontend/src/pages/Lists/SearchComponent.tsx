import React, { useState } from "react";
import { connect } from "react-redux";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const SearchComponent = ({ fields, rows, setShownRows }) => {
  const [fieldsForFiltering, setFieldsForFiltering] = useState(fields.map((x) => { return {field: x, isSelected: true} }));
  const [searchBy, setSearchBy] = useState("");

  const handleCheckChange = (event: any) => {
      const newFieldsForFiltering = fieldsForFiltering;
      fieldsForFiltering[event.target.id].isSelected = event.target.checked;
      setFieldsForFiltering(newFieldsForFiltering);
  };

  const filterBySearch = (row: any, wantedWord: string) => {
    return fieldsForFiltering.reduce((acc: boolean, curr: any) => 
                                          (curr.isSelected && row[curr.field].includes(wantedWord)) || acc, false);
  };

  const handleSubmitSearch = (event: any) => {
    setShownRows(rows.filter(x => filterBySearch(x, searchBy)));
  };

  const handleChangeSearch = (event: any) => {
    setSearchBy(event.target.value);
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
