import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Avatar as MuiAvatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { PageContainer } from "../../components/Profile/styles/ProfileSC";
import SearchComponent from "./SearchComponent";
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(
      event,
      Math.max(0, Math.ceil(count / rowsPerPage) - 1)
    );
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? (
          <LastPageIcon />
        ) : (
          <FirstPageIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <FirstPageIcon />
        ) : (
          <LastPageIcon />
        )}
      </IconButton>
    </Box>
  );
}

interface AvatarProps {
  size: string;
  round: boolean;
  name: any;
}

const Avatar = ({ size, round, name }: AvatarProps) => (
  <MuiAvatar
    sx={{
      width: size,
      height: size,
      borderRadius: round ? "50%" : "0%",
      bgcolor: "#8c1aff", // Purple background color
      color: "#ffffff", // White text color
    }}
    alt={name}
  >
    {name}
  </MuiAvatar>
);

const ListTemplate = ({ rows, fields, avatarName }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [shownRows, setShownRows] = useState(rows);

  useEffect(() => {
    setShownRows(rows);
  }, [rows]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shownRows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer>
      <SearchComponent fields={fields} rows={rows} setShownRows={setShownRows} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? shownRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : shownRows
            ).map((row, index: any) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Avatar
                    size="50"
                    round={true}
                    name={row ? row[avatarName] : "sampleVolunteerData"}
                  />
                </TableCell>
                {fields.map((field: any, index: any) => (
                  <TableCell align="left" key={index}>
                    {row[field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={shownRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default connect(null, null)(ListTemplate);
