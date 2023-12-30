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
  }, [dispatch, navigate, checkAuth]);

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
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      >
        <Box component="nav">
          <Sider />
        </Box>

        <Box
          component="main"
          sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
        >
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout;
