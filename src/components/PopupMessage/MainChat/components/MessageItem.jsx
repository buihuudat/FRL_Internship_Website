import { Avatar, Box, Paper, Typography } from "@mui/material";
import imgAI from "../../../../assets/images/aiChatbot.png";
import ReactMarkdown from "react-markdown";

const MessageItem = (props) => {
  const { message, fromSelf, reveicer, user } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: fromSelf ? "end" : "start",
        pb: 2,
      }}
    >
      <Paper
        elevation={9}
        sx={{
          width: "max-content",
          borderRadius: "50px",
          padding: 2,
          display: "flex",
          alignItems: "center",
          backgroundColor: fromSelf ? "#fff" : "#f0f0f0",
          color: fromSelf ? "#333" : "#000",
          maxWidth: "80%",
          overflowWrap: "break-word",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            padding: `0px ${fromSelf ? "0px" : "10px"} 0px ${
              !fromSelf ? "0px" : "10px"
            }`,
            flexDirection: fromSelf ? "row-reverse" : "row",
            alignItems: "start",
          }}
        >
          <Avatar src={fromSelf ? user?.avatar : imgAI} alt={"avatar"} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: fromSelf ? "end" : "start",
            }}
          >
            <Typography fontSize={18} fontWeight={600}>
              {fromSelf ? (user ? user?.username : "Khách") : reveicer?.name}
            </Typography>
            <Typography textAlign={"justify"}>
              <ReactMarkdown>{message}</ReactMarkdown>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default MessageItem;
