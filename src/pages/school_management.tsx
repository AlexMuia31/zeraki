import React from "react";
import type { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Layout from "@/components/Layout";
import { useGetSchoolsQuery } from "@/APIs/services";
import { Box, Container } from "@mui/material";
import DynamicDataTable from "@/components/DynamicDataTable";

const Schools: NextPageWithLayout = () => {
  const { data, error, isLoading } = useGetSchoolsQuery({});
  console.log("the data is", data);
  return (
    <Container maxWidth="xl">
      <DynamicDataTable />
    </Container>
  );
};

Schools.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Schools;
