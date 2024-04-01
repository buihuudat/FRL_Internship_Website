import { useSelector } from "react-redux";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { faqApi } from "../../utils/api/faqApi";

const Faq = () => {
  const [faq, setFaq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await faqApi.gets();
      setFaq(result);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <Box sx={{ height: "80vh", background: "white", overflow: "auto" }}>
      <Container
        sx={{ py: 5, display: "flex", flexDirection: "column", gap: 3 }}
      >
        {faq.map((data) => (
          <Paper
            key={data._id}
            sx={{ display: "flex", flexDirection: "column", padding: 2 }}
          >
            <Typography fontSize={20} fontWeight={600}>
              {data.question}
            </Typography>
            <Typography
              sx={{
                fontStyle: "italic",
                color: "gray",
              }}
            >
              {data.answer}
            </Typography>
          </Paper>
        ))}
      </Container>
    </Box>
  );
};

export default Faq;
