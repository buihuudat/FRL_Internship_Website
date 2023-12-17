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
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import MapIcon from '@mui/icons-material/Map';

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

    // {
    //   title: "Mức lương",
    //   icon: <AttachMoneyIcon />,
    //   href: "/admin/salary",
    // },
    // {
    //   title: "Khoảng cách",
    //   icon: <MapIcon />,
    //   href: "/admin/scale",
    // },
  ];

  const { pathname } = useLocation();

  const navigate = useNavigate();
  return (
    <Box sx={{ height: "100vh", width: 300 }}>
      <List sx={{ width: 300, bgcolor: "background.paper" }} component="nav">
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
