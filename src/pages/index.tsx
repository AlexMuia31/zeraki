import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
} from "@mui/material";
import type { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Layout from "@/components/Layout";
import { CommonTypo } from "@/components/Typographies";
import AnalyticsPie from "@/components/AnalyticsPie";
import SignupsPie from "@/components/SignupsPie";
import TimetablePie from "@/components/TimetablePie";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Zeraki</title>
        <meta name="description" content="Interview test for zeraki" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main">
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <Box>
                <Card
                  sx={{
                    "&:hover": { background: "#2FA6DE" },
                    borderRadius: "20px",
                  }}
                >
                  <CardContent>
                    <CommonTypo>Total Revenue</CommonTypo>
                    <CommonTypo sx={{ fontSize: "45px", fontWeight: 700 }}>
                      45k
                    </CommonTypo>
                    <CommonTypo>This is the total revenue overview</CommonTypo>
                    <Button
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "20px",
                        mt: "2%",
                        border: "1px solid #43AB49",
                        "&:hover": { border: "1px solid #fff", color: "#fff" },
                      }}
                      variant="outlined"
                    >
                      see details
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box>
                <Card
                  sx={{
                    "&:hover": { background: "#2FA6DE" },
                    borderRadius: "20px",
                  }}
                >
                  <CardContent>
                    <CommonTypo>Sign Ups</CommonTypo>
                    <CommonTypo sx={{ fontSize: "45px", fontWeight: 700 }}>
                      200
                    </CommonTypo>
                    <CommonTypo>
                      This is total number of school sign ups
                    </CommonTypo>
                    <Button
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "20px",
                        mt: "2%",
                        border: "1px solid #43AB49",
                        "&:hover": { border: "1px solid #fff", color: "#fff" },
                      }}
                      variant="outlined"
                    >
                      see details
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box>
                <Card
                  sx={{
                    "&:hover": { background: "#2FA6DE" },
                    borderRadius: "20px",
                  }}
                >
                  <CardContent>
                    <CommonTypo>Collections</CommonTypo>
                    <CommonTypo sx={{ fontSize: "45px", fontWeight: 700 }}>
                      150k
                    </CommonTypo>
                    <CommonTypo>
                      This is total number of collections made
                    </CommonTypo>
                    <Button
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "20px",
                        mt: "2%",
                        border: "1px solid #43AB49",
                        "&:hover": { border: "1px solid #fff", color: "#fff" },
                      }}
                      variant="outlined"
                    >
                      see details
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box>
                <Card
                  sx={{
                    "&:hover": { background: "#2FA6DE" },
                    borderRadius: "20px",
                  }}
                >
                  <CardContent>
                    <CommonTypo>Bounced Cheques</CommonTypo>
                    <CommonTypo sx={{ fontSize: "45px", fontWeight: 700 }}>
                      10
                    </CommonTypo>
                    <CommonTypo>
                      This is total number of bounced cheques
                    </CommonTypo>
                    <Button
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "20px",
                        mt: "2%",
                        border: "1px solid #43AB49",
                        "&:hover": { border: "1px solid #fff", color: "#fff" },
                      }}
                      variant="outlined"
                    >
                      see details
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: "4%" }}>
            <Grid item xs={12} md={6}>
              <Box>
                <CommonTypo sx={{ fontWeight: 600, fontSize: "18px" }}>
                  Zeraki Finance
                </CommonTypo>
                <CommonTypo sx={{ fontStyle: "italic", mb: "4%" }}>
                  (Target sign ups vs Total sign ups)
                </CommonTypo>
                <AnalyticsPie />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <CommonTypo sx={{ fontWeight: 600, fontSize: "18px" }}>
                  Zeraki Analytics
                </CommonTypo>
                <CommonTypo sx={{ fontStyle: "italic", mb: "4%" }}>
                  (Target sign ups vs Total sign ups)
                </CommonTypo>
                <SignupsPie />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: { md: "4%" } }}>
                <CommonTypo sx={{ fontWeight: 600, fontSize: "18px" }}>
                  Zeraki Timetable
                </CommonTypo>
                <CommonTypo sx={{ fontStyle: "italic", mb: "4%" }}>
                  (Target sign ups vs Total sign ups)
                </CommonTypo>
                <TimetablePie />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
