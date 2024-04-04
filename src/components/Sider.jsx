import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { permissionAccess } from "../resources/data";
import QuizIcon from "@mui/icons-material/Quiz";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

const Sider = () => {
  const user = useSelector((state) => state.user.user);

  const dataSider = [
    {
      title: "Công việc",
      icon: <BusinessIcon />,
      href: "/admin/jobs",
      active: permissionAccess.includes(user.role),
    },
    {
      title: "Công ty",
      icon: <WorkIcon />,
      href: "/admin/company",
      active: permissionAccess.includes(user.role),
    },
    {
      title: "Người dùng",
      icon: <PeopleIcon />,
      href: "/admin/users",
      active: user.role === "admin",
    },
    {
      title: "FAQ",
      icon: <QuizIcon />,
      href: "/admin/faq",
      active: user.role === "admin",
    },
    {
      title: "Payment",
      icon: <PaymentIcon />,
      href: "/admin/payment",
      active: user.role === "admin",
    },
    {
      title: "Customer",
      icon: <SettingsSuggestIcon />,
      href: "/admin/customer",
      active: user.role === "admin",
    },
  ];

  const { pathname } = useLocation();

  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", width: 300, height: "100vh" }}>
      <List sx={{ bgcolor: "background.paper", width: 300 }} component="nav">
        {dataSider.map(
          (data, i) =>
            data.active && (
              <ListItemButton
                key={i}
                onClick={() => navigate(data.href)}
                sx={
                  pathname === data.href && {
                    background: `linear-gradient(to right,  #540509, white)`,
                  }
                }
              >
                <ListItemIcon
                  sx={{ color: pathname === data.href ? "white" : "black" }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  primary={data.title}
                  sx={{ color: pathname === data.href ? "white" : "black" }}
                />
              </ListItemButton>
            )
        )}
      </List>
    </Box>
  );
};

export default Sider;
