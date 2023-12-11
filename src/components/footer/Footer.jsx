import { Box, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        gap: 20,
        py: 5,
        px: 10,
      }}
    >
      <Box>
        <Box>
          <IconButton>
            <LinkedInIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <FacebookIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <YouTubeIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <img src="" alt="logo" />
      </Box>
      <Box>
        <Typography color={"white"}>Về Internship</Typography>
      </Box>
      <Box>
        <Typography fontWeight={600} color={"white"}>
          Điều khoản chung
        </Typography>
        <Typography color={"white"}>Quy định bảo mật</Typography>
        <Typography color={"white"}>Quy định bảo mật</Typography>
        <Typography color={"white"}>Quy định bảo mật</Typography>
        <Typography color={"white"}>Thoả thuận sử dụng</Typography>
        <Typography color={"white"}>Thông cáo báo chí</Typography>
      </Box>
      <Box>
        <Typography fontWeight={600} color={"white"}>
          Điều khoản chung
        </Typography>
        <Typography color={"white"}>Quy định bảo mật</Typography>
        <Typography color={"white"}>Quy định bảo mật</Typography>
        <Typography color={"white"}>Quy định bảo mật</Typography>
        <Typography color={"white"}>Thoả thuận sử dụng</Typography>
        <Typography color={"white"}>Thông cáo báo chí</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
