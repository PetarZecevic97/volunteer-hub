/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Avatar as MuiAvatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Box,
  CssBaseline,
  TableHead,
} from "@mui/material";
import { PageContainer } from "../../components/Profile/styles/ProfileSC";
import SearchComponent from "./SearchComponent";
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
} from "@mui/icons-material";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
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
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface AvatarProps {
  size: string;
  round: boolean;
  name: any;
}

const Avatar = ({ size, round, name }) => (
  <MuiAvatar
    sx={{
      width: size,
      height: size,
      borderRadius: round ? "50%" : "0%",
      bgcolor: "#8c1aff",
      color: "#ffffff",
    }}
    alt={name}
  >
    {name}
  </MuiAvatar>
);

const ListTemplate = ({ entityName, rows, fields, avatarName }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [shownRows, setShownRows] = useState(rows);
  const [cellWidth, setCellWidth] = useState(`calc(100% / ${fields.length})`);

  useEffect(() => {
    setShownRows(rows);
  }, [rows, fields.length]);

  const getRefreshedRows = () => {
    return rows;
  };
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

  const theme = createTheme({
    palette: {
      mode: "dark",
      text: {
        primary: "#fafaff",
      },
    },
  });

  return (
    <PageContainer>
      <SearchComponent
        getRefreshedRows={getRefreshedRows}
        fields={fields}
        rows={shownRows}
        setShownRows={setShownRows}
      />
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            bgcolor: "#333", // Set the background color to dark theme
            color: "#fff", // Set the text color to white
          }}
        >
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <CssBaseline />
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {fields.map((field, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        backgroundColor: "#7600ff",
                        color: "#fff",
                        width: cellWidth,
                        borderBottom: "1px solid #ccc",
                        fontWeight: "bold",
                      }}
                    >
                      {field}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {shownRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => (
                    <Link
                      to={`/${entityName}/${row.id}`}
                      key={row.id}
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={rowIndex}
                        sx={{
                          "&:hover": { bgcolor: "#aaa3e0" },
                          cursor: "pointer",
                          display: "flex", // Remove or adjust this line
                          width: "250%",
                        }}
                        onClick={() => {
                          console.log("Row clicked:", row);
                        }}
                      >
                        {fields.map((column, columnIndex) => {
                          const value = row[column];

                          return (
                            <TableCell
                              key={columnIndex}
                              sx={{
                                borderBottom: "1px solid #ccc",
                                color: "#fff",
                                display: "flex",
                                width: cellWidth, // Remove or adjust this line
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </Link>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={shownRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              bgcolor: "#333", // Set pagination background color to dark theme
              color: "#fff", // Set pagination text color to white
              borderTop: "1px solid #ccc",
            }}
          />
        </Paper>
      </ThemeProvider>
    </PageContainer>
  );
};

export default connect(null, null)(ListTemplate);
