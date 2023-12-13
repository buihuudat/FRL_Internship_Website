import { Box, LinearProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/userSlice";
import { useEffect } from "react";
import { useCheckAuthMutation } from "../../api/user/userApi";

const AppLayout = () => {
  const [checkAuth, { isLoading }] = useCheckAuthMutation();
  const dispatch = useDispatch();
  const checkUser = async () => {
    const result = await checkAuth();
    if (result.data?.user) {
      dispatch(setUser(result.data.user));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box
      sx={{
        background: `linear-gradient(to right, black, #540509)`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box pt={10}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
