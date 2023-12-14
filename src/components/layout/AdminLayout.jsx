import { Box, LinearProgress } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import Sider from "../Sider";
import { useCheckAuthMutation } from "../../api/user/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/userSlice";

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [checkAuth] = useCheckAuthMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAdmin = async () => {
      const result = await checkAuth();
      if (
        (result.data?.user && result.data.user.role !== "admin") ||
        result.error
      ) {
        return navigate("/");
      }
      dispatch(setUser(result.data.user));
      setIsLoading(false);
    };
    checkAdmin();
  }, [dispatch, navigate]);

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
      <Box
        sx={{
          pt: 10,
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Sider />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout;
