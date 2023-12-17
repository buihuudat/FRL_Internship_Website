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
import CloseIcon from "@mui/icons-material/Close";
import { useGetNotificationsQuery } from "../../api/user/userApi";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showNoti, setShowNoti] = useState(false);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const { data } = useGetNotificationsQuery({ userId: user?._id });

  const notifications = data?.notifications?.notifications;

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

  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        p: 2,
        px: 10,
        position: "fixed",
        background: `linear-gradient(to right, black, #540509)`,
        width: "100%",
        zIndex: 1000,
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
          <Box sx={{ mr: 10 }}>
            <Button
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "white" }}
            >
              {user?.username}
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
              {user?.role === "admin" && (
                <MenuItem onClick={() => navigate("admin/jobs")}>
                  Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={viewProfile}>Tài khoản</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>

          <IconButton onClick={() => setShowNoti(true)}>
            <Badge badgeContent={notifications?.length} color="error">
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
            variant="outlined"
            sx={{ color: "white", width: 120 }}
            onClick={() => navigate("/dang-nhap")}
          >
            Đăng nhập
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white", width: 120 }}
            onClick={() => navigate("/dang-ky")}
          >
            Đăng Ký
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
            <IconButton onClick={() => setShowNoti(false)}>
              <CloseIcon />
            </IconButton>
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
                    gap: 4,
                  }}
                >
                  <Typography fontWeight={600}>{data.title}</Typography>
                  <Typography fontWeight={600}>
                    {moment(data.createdAt).format("l")}
                  </Typography>
                </Box>
                <Typography>{data.companyName}</Typography>
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
