import React, { useState } from "react";
import { connect } from "react-redux";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const SearchComponent = ({ fields, rows, setShownRows }) => {
  const [fieldsForFiltering, setFieldsForFiltering] = useState(fields.map((x) => { return {field: x, isSelected: true} }));
  const [searchBy, setSearchBy] = useState("");

  const handleCheckChange = (id: number, checked: boolean) => {
    const newFieldsForFiltering = fieldsForFiltering;
    newFieldsForFiltering[id].isSelected = checked;
    console.log("Ljeks ", newFieldsForFiltering);
    setFieldsForFiltering(newFieldsForFiltering);
  };

  const handleAllCheckChange = (checked: boolean) => {
    const newFieldsForFiltering = fieldsForFiltering.map(x => {
      return {...x, isSelected: checked};
    });
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
      <div>
        <label>What do you want to find?</label>
        <input name="search" id="search" required  onChange={handleChangeSearch}/>
        <button type="submit" value="Submit" onClick={handleSubmitSearch}>Search</button>
      </div>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked 
                                    onChange={(e, checked) => handleAllCheckChange(checked)}/>} label="All" />
        {fields.map((field, index) => {
          return (
            <FormControlLabel key={index}
                              control={<Checkbox id={index} checked={fieldsForFiltering[index].isSelected}
                              onChange={(e, checked) => handleCheckChange(index, checked)}/>} label={field} />
          );
        })}
      </FormGroup>
    </>
  );
};

export default connect(null, null)(SearchComponent);
