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
import { MainPalette } from "../../components/Providers/MainThemeProvider";

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
      <SearchComponent fields={fields} rows={shownRows} setShownRows={setShownRows} />
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            bgcolor: "#333", // Set the background color to dark theme
            color: "#fff", // Set the text color to white
          }}
        >
          <TableContainer component={Paper}>
            <CssBaseline />
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                {shownRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{
                        "&:hover": { bgcolor: "#aaa3e0" },
                        cursor: "pointer", // Make the row clickable
                      }}
                      onClick={() => {
                        // Handle row click here
                        console.log("Row clicked:", row);
                      }}
                    >
                      {fields.map((column) => {
                        const value = row[column];
                        return (
                          <TableCell
                            key={column.id}
                            sx={{
                              borderBottom: "1px solid #ccc",
                              bgcolor: "#333", // Set cell background color to dark theme
                              color: "#fff", // Set cell text color to white
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
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
