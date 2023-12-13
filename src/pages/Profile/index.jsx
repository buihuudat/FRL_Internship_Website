import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { setModal } from "../../slice/userSlice";
import ProfileModal from "../../components/ProfileModal";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setModal({ show: true }));
  };

  return (
    <Box>
      <Box sx={{ width: "100%", background: "white", padding: 3 }}>
        <Typography fontWeight={600} color={"red"} fontSize={25}>
          Hồ Sơ
        </Typography>
      </Box>

      <Box
        sx={{
          background: "#ddd",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
            padding: 5,
            width: 500,
            borderRadius: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                pb: 2,
              }}
            >
              <Avatar src={user?.avatar} alt="avt-user" />
              <Typography fontWeight={600} fontSize={23}>
                {user?.name || user?.username}
              </Typography>
            </Box>
            <IconButton onClick={handleEdit}>
              <BorderColorIcon color="error" />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MailOutlineIcon />
                <Typography>{user?.email}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon />
                <Typography>{user?.phone}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon />
                <Typography>{user?.address}</Typography>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon />
                <Typography>{user?.gender}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CardGiftcardIcon />
                <Typography>{moment(user?.birthday).format("l")}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SocialDistanceIcon />
                <Typography>{user?.social}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{ background: "#fff", padding: 5, width: 500, borderRadius: 5 }}
        >
          <Typography fontWeight={600}>Giới thiệu bản thân</Typography>
          <Divider />
          <Typography>{user?.description}</Typography>
        </Box>
      </Box>
      <ProfileModal />
    </Box>
  );
};

export default Profile;
