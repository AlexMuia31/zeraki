import React from "react";
import { useRouter } from "next/router";
import { useGetSchoolQuery } from "../../APIs/services";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/components/Layout";
import { ReactElement } from "react";
import { Container } from "@mui/material";
import { CommonTypo } from "@/components/Typographies";

const SchoolDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useGetSchoolQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const {
    name,
    type,
    product,
    county,
    registrationDate,
    contactInformation,
    balance,
  } = data;
  const { invoices, collections, totalBalance } = balance;

  return (
    <Container maxWidth="xl">
      <CommonTypo variant="h5">{name}</CommonTypo>
      <CommonTypo>Type: {type}</CommonTypo>
      <CommonTypo>Product: {product}</CommonTypo>
      <CommonTypo>County: {county}</CommonTypo>
      <CommonTypo>Registration Date: {registrationDate}</CommonTypo>
      <CommonTypo variant="h5" sx={{ mt: "4%" }}>
        Contact Information
      </CommonTypo>
      <CommonTypo>Phone: {contactInformation.phone}</CommonTypo>
      <CommonTypo>Email: {contactInformation.email}</CommonTypo>
      <CommonTypo>Address: {contactInformation.address}</CommonTypo>
      <CommonTypo variant="h5" sx={{ mt: "4%" }}>
        Balance Information
      </CommonTypo>
      <CommonTypo>Total Balance: {totalBalance}</CommonTypo>
      <CommonTypo variant="h6" sx={{ mt: "2%" }}>
        Invoices
      </CommonTypo>
      <ul>
        {invoices.map((invoice: any) => (
          <li key={invoice.id} style={{ color: "#000" }}>
            {invoice.id}: {invoice.amount} - {invoice.date}
          </li>
        ))}
      </ul>
      <CommonTypo variant="h6" sx={{ mt: "2%" }}>
        Collections
      </CommonTypo>
      <ul>
        {collections.map((collection: any) => (
          <li key={collection.id} style={{ color: "#000" }}>
            {collection.id}: {collection.amount} - {collection.date} (
            {collection.status})
          </li>
        ))}
      </ul>
    </Container>
  );
};

SchoolDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SchoolDetails;
