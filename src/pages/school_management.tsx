import React from "react";
import type { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Layout from "@/components/Layout";

const Schools: NextPageWithLayout = () => {
  return <div>Schools</div>;
};

Schools.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Schools;
