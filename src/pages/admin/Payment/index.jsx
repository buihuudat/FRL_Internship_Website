import { useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { payApi } from "../../../utils/api/paymentApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./FormPayment";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const stripePromise = loadStripe(
    "pk_test_51NFrKrEup2wfutAaLVem6eRVtamjYxuUJwOy6F9ewZ7BtakNcARqqzcV9nZa6hbuQNj73JWxf1CywUOaaie5lbrO005zUQAI7K"
  );

  const momoMethod = async () => {
    try {
      const res = await payApi.momoMethod("10000");
      if (res.payUrl) {
        window.location.href = res.payUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [client_secret, setClient_secret] = useState("");

  const paypalMethod = async () => {
    try {
      const res = await payApi.visaMethod(100000);
      console.log(res);
      setClient_secret(res.client_secret);
      setSelectedPaymentMethod("paypal");
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    clientSecret: client_secret,
  };

  return (
    <Container>
      {selectedPaymentMethod === "paypal" ? (
        <div>
          <Typography variant="h4">PayPal Payment Form</Typography>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </div>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          <Paper
            sx={{
              width: 300,
              height: 100,
              padding: 2,
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(168,8, 105)",
              cursor: "pointer",
            }}
            onClick={momoMethod}
          >
            <Typography fontSize={20} fontWeight={600} color={"white"}>
              MOMO
            </Typography>
          </Paper>
          <Paper
            sx={{
              width: 300,
              height: 100,
              padding: 2,
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00457c",
              cursor: "pointer",
            }}
            onClick={paypalMethod}
          >
            <Typography fontSize={20} fontWeight={600} color={"white"}>
              VNPAY
            </Typography>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default Payment;
