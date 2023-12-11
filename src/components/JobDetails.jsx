import { Avatar, Box, Button, Divider, Typography } from "@mui/material";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

const JobDetails = () => {
  const Skill = () => {
    return (
      <Typography
        sx={{
          px: 1,
          borderRadius: 20,
          width: "max-content",
          border: "1px solid #000",
        }}
      >
        Tester
      </Typography>
    );
  };

  const handleApply = () => {};
  return (
    <Box
      sx={{
        border: "2px solid #999",
        padding: 2,
        borderRadius: 5,
        minHeight: 500,
        backgroundColor: "white",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          variant="square"
          alt="img-company"
          sx={{ width: 100, height: 100 }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBKIWAjDsCobecM0lfPBVsgQinMCxRkx2TFTqotbwYdCUzUAHw8KKjWalvLPzIIHkXMdI&usqp=CAU"
        />
        <Box>
          <Typography fontWeight={700} fontSize={25}>
            Tester (QC)
          </Typography>
          <Typography fontWeight={600}>Goline corporation</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            <CurrencyExchangeIcon />
            <Typography fontWeight={600} fontSize={20}>
              1.500.000 d
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ py: 1, fontSize: 25, borderRadius: 5 }}
        onClick={handleApply}
      >
        Ứng tuyển
      </Button>

      <Divider sx={{ height: 2, py: 2 }} />

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocationOnIcon color="error" sx={{ fontSize: 30 }} />
          <Typography color={"red"} fontWeight={600}>
            tang 8, toa nha kim anh, 78 daij cof viet
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ApartmentIcon sx={{ fontSize: 30 }} />
          <Typography fontWeight={600}>Tai van phong</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AccessAlarmIcon sx={{ fontSize: 30 }} />
          <Typography fontWeight={600}>Full time</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography fontWeight={600} fontSize={20}>
            Kỹ năng:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Skill />
            <Skill />
            <Skill />
          </Box>
        </Box>

        <Divider sx={{ pt: 2 }} />

        <Box>
          <Typography fontSize={25} fontWeight={600}>
            ten cong ty
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              gap: 3,
            }}
          >
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Mô hình công ty</Typography>
              <Typography fontWeight={600}>Sản phẩm</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Quy mô công ty</Typography>
              <Typography fontWeight={600}>50-150 nhân viên</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Quốc gia</Typography>
              <Typography fontWeight={600}>Việt nam</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Thời gian làm việc</Typography>
              <Typography fontWeight={600}>Thứ 2 - Thứ 6</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Làm việc ngoài giờ</Typography>
              <Typography fontWeight={600}>Không có OT</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetails;
