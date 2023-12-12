import {
  Box,
  Link,
  Avatar,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slice/userSlice";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

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
          <Avatar />
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
              {user?.role === "admin" && <MenuItem>Dashboard</MenuItem>}
              <MenuItem onClick={viewProfile}>Tài khoản</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>

          <IconButton>
            <NotificationsIcon sx={{ color: "white" }} />
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
    </Box>
  );
};

export default Navbar;
