import React, { useState } from "react";
import { connect } from "react-redux";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles"; // Import makeStyles from MUI
import { useTheme } from "@mui/material/styles"; // Import useTheme

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.primary.main, // Use primary color
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
}));

const SearchComponent = ({ fields, rows, setShownRows }) => {
  const classes = useStyles(); // Apply styles
  const theme = useTheme(); // Get the current theme

  const [fieldsForFiltering, setFieldsForFiltering] = useState(
    fields.map((x) => ({ field: x, isSelected: true }))
  );
  const [searchBy, setSearchBy] = useState("");

  const filterBySearch = (row, wantedWord) => {
    return fieldsForFiltering.some(
      (curr) =>
        curr.isSelected && row[curr.field].includes(wantedWord.toLowerCase())
    );
  };

  const handleCheckChange = (event) => {
    const newFieldsForFiltering = [...fieldsForFiltering];
    newFieldsForFiltering[event.target.id].isSelected = event.target.checked;
    setFieldsForFiltering(newFieldsForFiltering);
  };

  const handleChangeSearch = (event) => {
    setSearchBy(event.target.value.toLowerCase());
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setShownRows(rows.filter((x) => filterBySearch(x, searchBy)));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">What do you want to find?</Typography>
      <TextField
        name="search"
        id="search"
        variant="outlined"
        size="small"
        required
        onChange={handleChangeSearch}
      />
      <Button
        variant="contained"
        color="secondary" // Use secondary color for the button
        startIcon={<SearchIcon />}
        onClick={handleSubmitSearch}
      >
        Search
      </Button>
      <FormGroup>
        {fields.map((field, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                id={index}
                defaultChecked
                onChange={handleCheckChange}
                color="secondary" // Use secondary color for the checkbox
              />
            }
            label={field}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default connect(null, null)(SearchComponent);
