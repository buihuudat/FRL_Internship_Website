import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "rsuite";

const MomoThank = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!search) {
      return navigate("/");
    }

    const urlSearchParams = new URLSearchParams(search);
    const resultCode = urlSearchParams.get("resultCode");

    if (resultCode === null || resultCode !== "0") {
      return navigate("/");
    }

    const momo_Amount = urlSearchParams.get("amount");
    setAmount(momo_Amount);
  }, [search, navigate]);

  return (
    <Box sx={{ height: "80vh", backgroundColor: "white" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Typography sx={{ mt: 10 }} align="center">
          Cảm ơn bạn đã thanh toán {amount}
        </Typography>

        <Button
          variant="outlined"
          color="success"
          onClick={() => navigate("/quan-li-don-hang")}
        >
          Quản lý đơn hàng
        </Button>
      </Box>
    </Box>
  );
};

export default MomoThank;
