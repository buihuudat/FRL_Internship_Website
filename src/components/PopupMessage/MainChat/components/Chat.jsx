import { useEffect, useRef, useState } from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

import MessageItem from "./MessageItem";
import { dataMessage } from "./data";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { messageApi } from "../../../../utils/api/messageApi";
import { setAiChat } from "../../../../slice/messageSlice";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const {
    user: data,
    userChat,
    aiChat,
  } = useSelector((state) => state.messages);

  useEffect(() => {
    const chatContainer = messagesEndRef.current;
    if (chatContainer) {
      const isUserAtBottom =
        chatContainer.scrollHeight - chatContainer.clientHeight <=
        chatContainer.scrollTop + 1;

      if (isUserAtBottom) {
        chatContainer.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [userChat, isLoading]);

  const handleSend = async () => {
    if (!message) return;
    setIsLoading(true);
    setMessage("");
    dispatch(
      setAiChat({
        fromSelf: true,
        message: message,
      })
    );
    if (data.user._id === "AI") {
      try {
        const result = await messageApi.ask({ userId: user._id, message });
        setMessageData((prev) => [result, ...prev]);
        dispatch(setAiChat(result));
      } catch (error) {
        dispatch(
          setAiChat({
            fromSelf: false,
            message: "Đã sảy ra lỗi",
          })
        );
      }
    } else {
      if (!user) return toast.error("Bạn cần phải đăng nhập trước");

      const data = {
        user,
        from: user?._id,
        to: data.user._id,
        message: {
          text: message,
        },
      };
      const result = await messageApi.send(data);
    }
    setIsLoading(false);
  };

  return (
    <Box pl={2} display={"flex"} flexDirection={"column"} height={"100%"}>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
        >
          <Typography>to: </Typography>
          <Typography fontWeight={600}>{data.user.name}</Typography>
        </Box>
        <Divider variant="middle" />
      </Box>
      <Box sx={{ flex: 1, padding: 3, overflow: "auto", height: "80%" }}>
        {(data.user._id === "AI" ? aiChat : userChat).map((chat, index) => (
          <MessageItem key={index} {...chat} reveicer={data.user} user={user} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      {data.user._id === "AI" && (
        <Box display={"flex"} flexWrap={"wrap"} gap={1}>
          {dataMessage.map((mess, i) => (
            <Typography
              onClick={() => setMessage(mess)}
              key={i}
              sx={{
                px: 1,
                fontSize: 12,
                width: "max-content",
                borderRadius: "50px",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#540509",
                cursor: "pointer",
              }}
            >
              {mess}
            </Typography>
          ))}
        </Box>
      )}
      <Box sx={{ mt: "auto", width: "100%", display: "flex" }}>
        <TextField
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          value={message}
          label="Đặt câu hỏi..."
          variant="filled"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <LoadingButton
          onClick={handleSend}
          loading={isLoading}
          color="error"
          disabled={!message}
        >
          <SendIcon />
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Chat;
