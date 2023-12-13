import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Box, LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useCheckAuthMutation } from "../../api/user/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/userSlice";

const AuthLayout = () => {
  const [checkAuth, { isLoading }] = useCheckAuthMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUser = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/");
    const result = await checkAuth();
    dispatch(setUser(result.data.user));
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

export default AuthLayout;
