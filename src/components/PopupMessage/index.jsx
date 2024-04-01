import { useDispatch, useSelector } from "react-redux";
import { Box, SpeedDial } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import MainChat from "./MainChat";
import ZoomInFromBottomRight from "./ZoomInFromBottomRight ";
import { selectUser, setPopup } from "../../slice/messageSlice";
import { data } from "./MainChat/components/data";

const PopupMessage = () => {
  const popup = useSelector((state) => state.messages.popup);
  const dispatch = useDispatch();

  const toggleMainChat = () => {
    dispatch(setPopup(!popup));
    dispatch(selectUser(data[0]));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        display: "flex",
        gap: 3,
        zIndex: 1000,
      }}
    >
      <ZoomInFromBottomRight isOpen={popup}>
        <MainChat />
      </ZoomInFromBottomRight>
      <SpeedDial
        ariaLabel="Popup message"
        color="red"
        sx={{}}
        icon={<MessageIcon />}
        FabProps={{
          sx: {
            bgcolor: "#A22630",
            ":hover": {
              bgcolor: "#540509",
            },
          },
        }}
        onClick={toggleMainChat}
      ></SpeedDial>
    </Box>
  );
};

export default PopupMessage;
