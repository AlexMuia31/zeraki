import { Chip } from "@mui/material";
import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CommonTypo } from "./Typographies";
import { CssTextField } from "./CustomTextfield";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Date from "./DatePicker";
import { BlueButton, GreenButton } from "./Buttons";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const InvoicesModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Chip
        label="collect payment"
        sx={{ cursor: "pointer" }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="collection modal"
      >
        <Box sx={{ ...style, borderRadius: "10px" }}>
          <CommonTypo>School Name :</CommonTypo>
          <CssTextField
            size="small"
            placeholder="Enter school name"
            fullWidth
          />
          <CommonTypo sx={{ mt: "5%" }}>Amount Due :</CommonTypo>
          <CssTextField size="small" placeholder="Enter amount due" fullWidth />
          <CommonTypo sx={{ mt: "5%" }}> Due Date :</CommonTypo>
          <Date />
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: "7%", gap: 2 }}
          >
            <BlueButton fullWidth onClick={handleClose}>
              Cancel
            </BlueButton>
            <GreenButton fullWidth onClick={handleClose}>
              Submit
            </GreenButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default InvoicesModal;
