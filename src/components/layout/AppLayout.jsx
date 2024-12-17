import { Box, LinearProgress } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slice/userSlice";
import { useEffect, useState } from "react";
import { authApi } from "../../utils/api/authApi";
import { notificationApi } from "../../utils/api/notificationApi";
import { setNotifications } from "../../slice/notification";
import PopupMessage from "../PopupMessage";
import { companyApi } from "../../utils/api/companyApi";
import { setCompanyAuthor } from "../../slice/companySlice";

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await authApi.checkAuth();
        if (result?.user) {
          const notifications = await notificationApi.getNotifications();
          const companyByAuth = await companyApi.getCompanyByAuth();
          dispatch(setCompanyAuthor(companyByAuth));
          notifications && dispatch(setNotifications(notifications));
          dispatch(setUser(result.user));
          setUser(result.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setIsLoading(false);
    checkUser();
  }, [dispatch]);
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
        {user && pathname !== "/search" ? (
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            <PopupMessage />
          </Box>
        ) : null}
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
