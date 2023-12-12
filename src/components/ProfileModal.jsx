import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../slice/userSlice";
import {
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  minWidth: 500,
  borderRadius: 5,
};

const ProfileModal = () => {
  const { user } = useSelector((state) => state.user);
  const [gender, setGender] = useState(user?.sex);
  const dispatch = useDispatch();

  const open = useSelector((state) => state.user.modal.show);

  const handleClose = () => {
    dispatch(setModal({ show: false, data: null }));
  };

  const handleChangeGender = () => {
    if (user?.sex === "male") {
      setGender("female");
    } else {
      setGender("male");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={25} fontWeight={600}>
            Thông tin cá nhân
          </Typography>
          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={user?.avatar}
              alt="avt-user"
              sx={{ width: 100, height: 100 }}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Button
                variant="text"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <CameraAltIcon color="red" />
                <Typography color={"red"} fontWeight={600}>
                  Chỉnh sửa
                </Typography>
              </Button>
              <Button
                variant="text"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <DeleteIcon />
                <Typography fontWeight={600}>Xóa</Typography>
              </Button>
            </Box>
          </Box>

          <Box>
            <TextField
              label="Họ và tên"
              required
              defaultChecked={user?.name}
              fullWidth
            />
            <TextField
              label="Địa chỉ email"
              required
              defaultChecked={user?.email}
              sx={{ width: "45%" }}
            />
            <TextField
              label="Số điện thoại"
              required
              defaultChecked={user?.phone}
              sx={{ width: "45%" }}
            />
            <TextField
              label="Ngày sinh"
              required
              defaultChecked={user?.dayOfBirth}
              sx={{ width: "45%" }}
            />
            <FormControl sx={{ width: "45%" }}>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={gender}
                label="Giới tính"
                onChange={handleChangeGender}
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Ngày sinh"
              required
              defaultChecked={user?.dayOfBirth}
              sx={{ width: "45%" }}
            />
            <TextField
              label="Ngày sinh"
              required
              defaultChecked={user?.dayOfBirth}
              sx={{ width: "45%" }}
            />
            <Box>
              <Typography fontWeight={600}>Giới thiệu bản thân</Typography>
              <Divider />
              <TextField
                label="Ngày sinh"
                multiline
                rows={2}
                defaultChecked={user?.dayOfBirth}
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
