import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";

const data = [
  {
    name: "Product Uptake",
    primary: 30000,
    secondary: 45000,
    IGCSE: 60000,
  },
];

const FinanceBar = () => {
  return (
    <Box sx={{ display: "flex", height: 400, width: "100%", mt: "7%" }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="primary" fill="#8884d8" />
          <Bar dataKey="secondary" fill="#82ca9d" />
          <Bar dataKey="IGCSE" fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default FinanceBar;
