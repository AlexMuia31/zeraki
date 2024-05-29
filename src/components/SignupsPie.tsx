import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";
import { CommonTypo } from "./Typographies";

const data = [
  { label: "Total Revenue", value: 450 },
  { label: "Target Revenue", value: 1000 },
];

const SignupsPie = () => {
  return (
    <Box>
      <PieChart
        series={[
          {
            data,
          },
        ]}
        height={400}
        legend={{ hidden: true }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: "2%" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{ width: "20px", height: "20px", background: "#2E96FF" }}
          ></Box>
          <CommonTypo>Target Sign Ups</CommonTypo>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Box
            sx={{ width: "20px", height: "20px", background: "#02B2AF" }}
          ></Box>
          <CommonTypo>Total Sign Ups</CommonTypo>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupsPie;
