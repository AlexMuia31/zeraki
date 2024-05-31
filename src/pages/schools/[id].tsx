import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  useGetSchoolQuery,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
  useUpdateInvoiceMutation,
} from "../../APIs/services";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/components/Layout";
import { ReactElement } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  Skeleton,
  Box,
  TextField,
} from "@mui/material";
import { CommonTypo } from "@/components/Typographies";

type Collection = {
  collectionNumber: number;
  invoiceNumber: string;
  amount: number;
  dateOfCollection: string;
  status: string;
};

type Invoice = {
  invoiceNumber: string;
  invoiceItem: string;
  creationDate: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  balance: number;
  completionStatus: string;
  daysUntilDue: number;
};

type SchoolData = {
  name: string;
  type: string;
  product: string;
  county: string;
  registrationDate: string;
  contactInformation: {
    phone: string;
    email: string;
    address?: string;
  };
  schoolBalance: number;
  invoices: Invoice[];
  collections: Collection[];
};

const SchoolDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, error, isLoading } = useGetSchoolQuery(id);
  const [completedFilter, setCompletedFilter] = useState(false);
  const [pendingFilter, setPendingFilter] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteCollection, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteCollectionMutation();
  const [updateCollection, { isLoading: updateLoading, error: updateError }] =
    useUpdateCollectionMutation();
  const [updateInvoice] = useUpdateInvoiceMutation();

  const [editableStatuses, setEditableStatuses] = useState<{
    [key: number]: string;
  }>({});
  const [editableInvoices, setEditableInvoices] = useState<{
    [key: string]: Invoice;
  }>({});

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

  const {
    name,
    type,
    product,
    county,
    registrationDate,
    contactInformation,
    schoolBalance,
    invoices,
    collections,
  } = data as SchoolData;

  const handleDeleteInvoice = (invoiceId: string) => {
    deleteCollection(invoiceId);
  };

  const handleUpdateInvoice = (invoiceId: string, newData: any) => {
    updateInvoice({ id: invoiceId, body: newData }).then(() => {
      setSnackbarMessage("Invoice updated successfully");
      setSnackbarOpen(true);
    });
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditableInvoices({
      ...editableInvoices,
      [invoice.invoiceNumber]: invoice,
    });
  };

  const handleInvoiceChange = (
    invoiceNumber: string,
    field: string,
    value: string | number
  ) => {
    setEditableInvoices({
      ...editableInvoices,
      [invoiceNumber]: {
        ...editableInvoices[invoiceNumber],
        [field]: value,
      },
    });
  };

  const handleSaveInvoice = (invoiceNumber: string) => {
    const updatedInvoice = editableInvoices[invoiceNumber];
    handleUpdateInvoice(invoiceNumber, updatedInvoice);
    setEditableInvoices((prev) => {
      const { [invoiceNumber]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleCancelEditInvoice = (invoiceNumber: string) => {
    setEditableInvoices((prev) => {
      const { [invoiceNumber]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleStatusChange = (collectionId: number, newStatus: string) => {
    setEditableStatuses({ ...editableStatuses, [collectionId]: newStatus });
  };

  const handleStatusSave = (collectionId: number) => {
    const updatedCollection = collections.find(
      (collection: Collection) => collection.collectionNumber === collectionId
    );
    if (updatedCollection) {
      updateCollection({
        id: collectionId,
        body: { status: editableStatuses[collectionId] },
      }).then(() => {
        setSnackbarMessage("Status updated successfully");
        setSnackbarOpen(true);
      });
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    if (completedFilter && invoice.completionStatus !== "Completed") {
      return false;
    }
    if (pendingFilter && invoice.completionStatus !== "Pending") {
      return false;
    }
    return true;
  });

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <CommonTypo sx={{ fontWeight: 700 }}>School Details</CommonTypo>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Type
              </TableCell>
              <TableCell>{type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Product
              </TableCell>
              <TableCell>{product}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                County
              </TableCell>
              <TableCell>{county}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Registration Date
              </TableCell>
              <TableCell>{registrationDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Contact Information
              </TableCell>
              <TableCell>
                <div>Phone: {contactInformation.phone}</div>
                <div>Email: {contactInformation.email}</div>
                {contactInformation.address && (
                  <div>Address: {contactInformation.address}</div>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Balance Information
              </TableCell>
              <TableCell>School Balance: {schoolBalance}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Invoice Table */}
      <FormControlLabel
        control={
          <Checkbox
            checked={completedFilter}
            onChange={() => setCompletedFilter(!completedFilter)}
            name="completedFilter"
            color="primary"
          />
        }
        label="Completed"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={pendingFilter}
            onChange={() => setPendingFilter(!pendingFilter)}
            name="pendingFilter"
            color="primary"
          />
        }
        label="Pending"
      />
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table sx={{ minWidth: 1500 }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={10}>
                <CommonTypo sx={{ fontWeight: 700 }}>Invoices</CommonTypo>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Invoice Item</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Creation Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Paid Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Balance</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Completion Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Days Until Due</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice: Invoice) => (
              <TableRow key={invoice.invoiceNumber}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>
                  {editableInvoices[invoice.invoiceNumber] ? (
                    <TextField
                      value={
                        editableInvoices[invoice.invoiceNumber].invoiceItem
                      }
                      onChange={(e) =>
                        handleInvoiceChange(
                          invoice.invoiceNumber,
                          "invoiceItem",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    invoice.invoiceItem
                  )}
                </TableCell>
                <TableCell>{invoice.creationDate}</TableCell>
                <TableCell>
                  {editableInvoices[invoice.invoiceNumber] ? (
                    <TextField
                      type="date"
                      value={editableInvoices[invoice.invoiceNumber].dueDate}
                      onChange={(e) =>
                        handleInvoiceChange(
                          invoice.invoiceNumber,
                          "dueDate",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    invoice.dueDate
                  )}
                </TableCell>
                <TableCell>
                  {editableInvoices[invoice.invoiceNumber] ? (
                    <TextField
                      type="number"
                      value={editableInvoices[invoice.invoiceNumber].amount}
                      onChange={(e) =>
                        handleInvoiceChange(
                          invoice.invoiceNumber,
                          "amount",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  ) : (
                    invoice.amount
                  )}
                </TableCell>
                <TableCell>{invoice.paidAmount}</TableCell>
                <TableCell>{invoice.balance}</TableCell>
                <TableCell>{invoice.completionStatus}</TableCell>
                <TableCell>{invoice.daysUntilDue}</TableCell>
                <TableCell>
                  {editableInvoices[invoice.invoiceNumber] ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSaveInvoice(invoice.invoiceNumber)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleCancelEditInvoice(invoice.invoiceNumber)
                        }
                        sx={{ marginLeft: 1 }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditInvoice(invoice)}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Collections Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                <CommonTypo sx={{ fontWeight: 700 }}>Collections</CommonTypo>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Invoice Number</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections.map((collection: Collection) => (
              <TableRow key={collection.collectionNumber}>
                <TableCell>{collection.collectionNumber}</TableCell>
                <TableCell>{collection.invoiceNumber}</TableCell>
                <TableCell>{collection.amount}</TableCell>
                <TableCell>{collection.dateOfCollection}</TableCell>
                <TableCell>
                  <FormControl>
                    <Select
                      value={
                        editableStatuses[collection.collectionNumber] ||
                        collection.status
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          collection.collectionNumber,
                          e.target.value as string
                        )
                      }
                      size="small"
                    >
                      <MenuItem value="Valid">Valid</MenuItem>
                      <MenuItem value="Invalid">Invalid</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleStatusSave(collection.collectionNumber)
                    }
                    sx={{ marginLeft: 1 }}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        sx={{ background: "green" }}
      >
        <Alert severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

SchoolDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SchoolDetails;
