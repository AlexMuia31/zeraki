import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";
import { CommonTypo } from "./Typographies";

const data = [
  { label: "Total Revenue", value: 45000 },
  { label: "Target Revenue", value: 60000 },
];

const AnalyticsPie = () => {
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
          <CommonTypo>Target Revenue</CommonTypo>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Box
            sx={{ width: "20px", height: "20px", background: "#02B2AF" }}
          ></Box>
          <CommonTypo>Total Revenue</CommonTypo>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsPie;
