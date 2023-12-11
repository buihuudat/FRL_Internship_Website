import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useGetUserQuery } from "../../api/user/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AppLayout = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(to right, black, #540509)`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default AppLayout;
