import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CssTextField = styled(TextField)({
  "& .MuiTextField-root": { width: "150.15px" },
  "& label.Mui-focused": {
    color: "#B1B4BB",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#B1B4BB",
    },
    "&:hover fieldset": {
      borderColor: "#B1B4BB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#B1B4BB",
    },
  },
  ".MuiInputBase-root": {
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
});
