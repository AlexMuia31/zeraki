import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const GreenButton = styled(Button)({
  color: "#fff",
  background: "#43AB49",
  textTransform: "capitalize",
  "&:hover": { background: "#43AB49" },
});

export const BlueButton = styled(Button)({
  color: "#fff",
  background: "#2E96FF",
  textTransform: "capitalize",
  "&:hover": { background: "#2E96FF" },
});
