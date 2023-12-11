import { Avatar, Box, Divider, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const JobItem = () => {
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
  return (
    <Box
      sx={{
        padding: 2,
        border: "2px solid red",
        borderRadius: 5,
        width: 400,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "white",
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: "600" }}>
        job title
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBKIWAjDsCobecM0lfPBVsgQinMCxRkx2TFTqotbwYdCUzUAHw8KKjWalvLPzIIHkXMdI&usqp=CAU"
          variant="square"
        />
        <Typography>company name</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocationOnIcon color="error" />
          <Typography color={"red"} fontWeight={600}>
            Cách 0.8 km
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
          <ApartmentIcon />
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
          <CurrencyExchangeIcon />
          <Typography fontWeight={600}>1.500.000 d</Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Skill />
      </Box>
    </Box>
  );
};

export default JobItem;
