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

const Sider = () => {
  const dataSider = [
    {
      title: "Công việc",
      icon: <BusinessIcon />,
      href: "/admin/jobs",
    },
    {
      title: "Công ty",
      icon: <WorkIcon />,
      href: "/admin/company",
    },
    {
      title: "Người dùng",
      icon: <PeopleIcon />,
      href: "/admin/users",
    },
  ];

  const { pathname } = useLocation();

  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", width: 300, height: "100vh" }}>
      <List sx={{ bgcolor: "background.paper", width: 300 }} component="nav">
        {dataSider.map((data, i) => (
          <ListItemButton
            key={i}
            onClick={() => navigate(data.href)}
            sx={pathname === data.href && { background: "#999" }}
          >
            <ListItemIcon>{data.icon}</ListItemIcon>
            <ListItemText primary={data.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sider;
