import {
  Box,
  Link,
  Avatar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Badge,
  Paper,
  Divider,
} from "@mui/material";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slice/userSlice";
import moment from "moment";
import { permissionAccess } from "../../resources/data";
import { setNotifications } from "../../slice/notification";
import toast from "react-hot-toast";
import { notificationApi } from "../../utils/api/notificationApi";
import TrickNav from "../TrickNav";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showNoti, setShowNoti] = useState(false);

  const { notifications } = useSelector(
    (state) => state.notification.notifications
  );

  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewProfile = () => {
    navigate("/tai-khoan");
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("search");
    dispatch(setUser(null));
    dispatch(setNotifications([]));
    window.location.href = "/";
  };

  const handleCheckAll = async () => {
    try {
      await toast.promise(notificationApi.checkAll(), {
        loading: "Đang xử lý...",
        success: ({ message }) => message,
        error: "Xử lý thất bại",
      });
      setShowNoti(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        pt: 1,
        px: 10,
        position: "fixed",
        background: `linear-gradient(to right, black, #540509)`,
        width: "100%",
        zIndex: 1000,
        alignItems: "center",
      }}
    >
      <Link
        sx={{
          fontSize: 40,
          fontWeight: 600,
          color: "white",
          textDecoration: "none",
          fontFamily: "Lilita One",
        }}
        href="/"
      >
        Internship
      </Link>
      <TrickNav />
      {user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar src={user?.avatar} alt="avt-user" />
          <Box sx={{ mr: 1 }}>
            <Button
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "white" }}
            >
              {user?.username?.length > 20
                ? user?.username.slice(0, 20) + "..."
                : user.username}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {permissionAccess.includes(user?.role) && (
                <MenuItem onClick={() => navigate("admin/jobs")}>
                  Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={viewProfile}>Tài khoản</MenuItem>
              <MenuItem onClick={() => navigate("/da-ung-tuyen")}>
                Hồ sơ đã ứng tuyển
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>

          <IconButton onClick={() => setShowNoti(!showNoti)}>
            <Badge
              badgeContent={
                notifications?.filter((n) => n.viewed !== true)?.length
              }
              color="error"
            >
              <NotificationsIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Button
            variant="text"
            sx={{ color: "white", width: 120, fontWeight: "600" }}
            onClick={() => navigate("/dang-nhap")}
          >
            Đăng nhập
          </Button>
        </Box>
      )}
      {showNoti && (
        <Paper
          onClose={handleClose}
          open={true}
          sx={{
            top: 70,
            right: 0,
            position: "absolute",
            zIndex: 10,
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={600} fontSize={18}>
              Thông báo
            </Typography>
            <Typography
              fontWeight={600}
              fontSize={18}
              color={"blue"}
              sx={{ cursor: "pointer" }}
              onClick={handleCheckAll}
            >
              Đánh dấu đã đọc
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              maxHeight: 500,
              overflow: "auto",
            }}
          >
            {notifications?.map((data) => (
              <Box key={data._id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontWeight={600} sx={{ color: "#555" }}>
                    {data.title}
                  </Typography>
                  <Typography fontWeight={600}>
                    {moment(data.createdAt).format("DD/MM/YYYY")}
                  </Typography>
                </Box>
                <Typography fontWeight={600}>{data.companyName}</Typography>
                <Typography sx={{ fontStyle: "italic" }}>
                  {data?.jobTitle &&
                    `Cảm ơn bạn đã apply vị trí ${data?.jobTitle}`}
                </Typography>
                <Typography>Chúng tôi đã gửi CV đến doanh nghiệp</Typography>
                <Typography color={"red"} fontSize={13}>
                  Vui lòng chờ phản hồi phía doanh nghiệp qua email đã đăng kí
                </Typography>
                <Divider />
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Navbar;
