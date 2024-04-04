import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { setModal, setSkillModal } from "../../slice/userSlice";
import ProfileModal from "../../components/ProfileModal";
import moment from "moment";
import { useState } from "react";
import { address } from "../../actions/userAddress";
import SkillModal from "../../components/SkillModal";
import LinkIcon from "@mui/icons-material/Link";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [showFull, setShowFull] = useState(false);
  const [skills, setSkills] = useState(user?.skills || []);

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setModal({ show: true }));
  };

  const handleEditSkills = () => {
    dispatch(setSkillModal({ show: true, data: user?.skills }));
  };

  return (
    <Box>
      <Box
        sx={{ width: "100%", background: "white", padding: 2, display: "flex" }}
      >
        <Typography fontWeight={600} color={"#AA113F"} fontSize={25}>
          Hồ Sơ
        </Typography>
        <Typography
          align="center"
          sx={{ margin: "auto" }}
          fontWeight={600}
          color={"gray"}
          fontSize={20}
          fontFamily={"monospace"}
          fontStyle={"italic"}
        >
          Thêm kỹ năng của bạn để dễ dàng tìm được công việc thích hợp!
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
          gap: 3,
          paddingX: 10,
          py: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
            padding: 5,
            width: 700,
            borderRadius: 5,
            elevation: 5,
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
                pb: 4,
              }}
            >
              <Avatar
                src={user?.avatar}
                alt="avt-user"
                sx={{ width: 70, height: 70 }}
              />
              <Typography fontWeight={600} fontSize={25}>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MailOutlineIcon color="error" sx={{ width: 30, height: 30 }} />
                <Typography>{user?.email}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon color="error" sx={{ width: 30, height: 30 }} />
                <Typography>{user?.phone}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon color="error" sx={{ width: 30, height: 30 }} />
                <Typography>
                  {address(user?.address)?.length > 50
                    ? address(user?.address).slice(0, 50) + "..."
                    : address(user?.address)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon color="error" sx={{ width: 30, height: 30 }} />
                <Typography>{user?.gender}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CardGiftcardIcon
                  color="error"
                  sx={{ width: 30, height: 30 }}
                />
                <Typography>
                  {moment(user?.birthday).format("DD/MM/yyyy")}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LinkIcon color="error" sx={{ width: 30, height: 30 }} />
                <Typography component={Link} href={user?.social}>
                  {user?.social?.length > 20
                    ? user.social.slice(0, 20) + "..."
                    : user.social}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{ background: "#fff", padding: 5, width: 700, borderRadius: 5 }}
        >
          <Typography fontWeight={600}>Giới thiệu bản thân</Typography>
          <Divider />
          {user?.description && (
            <Typography>
              {showFull
                ? user?.description
                : user?.description?.slice(0, 100) + "..."}
              {
                <a
                  onClick={() => setShowFull(!showFull)}
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {!showFull ? "Hiện thêm" : "Ẩn bớt"}
                </a>
              }
            </Typography>
          )}
        </Box>

        {/* skills */}
        <Box
          sx={{ background: "#fff", padding: 5, width: 700, borderRadius: 5 }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography fontWeight={600}>Kỹ năng</Typography>
            <IconButton onClick={handleEditSkills}>
              <BorderColorIcon color="error" />
            </IconButton>
          </Box>
          <Divider />

          <Box
            sx={{
              m: 1,
              display: "flex",
              gap: 1,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {skills &&
              skills?.map((skill, index) => (
                <Typography
                  key={index}
                  sx={{
                    px: 1,
                    pt: 0.3,
                    borderRadius: 20,
                    width: "max-content",
                    border: "1px solid gray",
                    fontWeight: 600,
                    color: "gray",
                  }}
                >
                  {skill}
                </Typography>
              ))}
          </Box>
        </Box>
      </Box>
      <ProfileModal />
      <SkillModal skills={skills} setSkills={setSkills} />
    </Box>
  );
};

export default Profile;
