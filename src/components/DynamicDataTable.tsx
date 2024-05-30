import { Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetSchoolsQuery } from "@/APIs/services";
import { GreenButton } from "./Buttons";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DynamicDataTable = () => {
  const { data, error, isLoading } = useGetSchoolsQuery({});

  if (isLoading)
    return (
      <div>
        <Box sx={{ width: "100%", height: "50vh" }}>
          <Skeleton sx={{ height: "50vh" }} />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </div>
    );
  if (error) return <div>Error loading data</div>;

  const rows = data.map((school: any) => {
    const { id, name, type, invoices } = school;
    const latestInvoice = invoices[invoices.length - 1] || {};
    const amount = latestInvoice.amount || 0;
    const dueDate = latestInvoice.dueDate || "N/A";

    return {
      id,
      name,
      amount,
      dueDate,
      type,
      action: (
        <Link href={`/schools/${id}`} passHref>
          <GreenButton>View details</GreenButton>
        </Link>
      ),
    };
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>School</StyledTableCell>
            <StyledTableCell align="center">Amount due</StyledTableCell>
            <StyledTableCell align="center">Due date</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Quick Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.amount}</StyledTableCell>
              <StyledTableCell align="center">{row.dueDate}</StyledTableCell>
              <StyledTableCell align="center">{row.type}</StyledTableCell>
              <StyledTableCell align="center">{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicDataTable;
