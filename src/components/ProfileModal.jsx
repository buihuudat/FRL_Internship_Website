import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setUser } from "../slice/userSlice";
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
import FileBase64 from "react-file-base64";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

import { useUpdateUserMutation } from "../api/user/userApi";
import moment from "moment";
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

  const [avatar, setAvatar] = useState(user?.avatar);
  const [gender, setGender] = useState(user?.gender);

  const dispatch = useDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: user.username,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      birthday: formData.get("birthday"),
      description: formData.get("description"),
      social: formData.get("social"),
      avatar: avatar,
      gender: gender,
    };

    if (data.name.length < 6) return toast.error("Tên không hợp lệ");
    if (data.email.length < 6) return toast.error("Email không hợp lệ");
    if (data.phone.length < 10 || data.phone.length > 11)
      return toast.error("Số điện thoại không hợp lệ");
    if (data.phone.length < 10) return toast.error("Địa chỉ không hợp lệ");

    const result = await updateUser(data);
    if (result.data?.user) {
      dispatch(setUser(result.data.user));
      toast.success("Cập nhật thành công");
      handleClose();
    }
  };

  const handleChangeAvatar = (e) => {
    console.log(e);
    if (e.type !== "image/png") return toast.error("Ảnh không hợp lệ");
    setAvatar(e.base64);
  };

  const formattedBirthday = user
    ? moment(user.birthday).format("YYYY-MM-DD")
    : "";

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
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
              src={avatar}
              alt="avt-user"
              sx={{ width: 100, height: 100 }}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {/* <Button
                variant="text"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <CameraAltIcon color="red" />
                <Typography color={"red"} fontWeight={600}>
                  Chỉnh sửa
                </Typography>
              </Button> */}
              <FileBase64 onDone={handleChangeAvatar} />
              {/* <Button
                variant="text"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <DeleteIcon />
                <Typography fontWeight={600}>Xóa</Typography>
              </Button> */}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <TextField
              label="Họ và tên"
              required
              defaultValue={user?.name}
              name="name"
              fullWidth
            />
            <TextField
              label="Địa chỉ email"
              required
              name="email"
              type="email"
              defaultValue={user?.email}
              sx={{ width: "45%" }}
            />
            <TextField
              label="Số điện thoại"
              required
              name="phone"
              defaultValue={user?.phone}
              sx={{ width: "45%" }}
            />
            <TextField
              label="Ngày sinh"
              required
              name="birthday"
              type="date"
              defaultValue={formattedBirthday}
              sx={{ width: "45%" }}
            />
            <FormControl sx={{ width: "45%" }}>
              <InputLabel>Giới tính</InputLabel>
              <Select
                defaultValue={gender}
                label="Giới tính"
                onChange={handleChangeGender}
              >
                <MenuItem value={"male"}>Nam</MenuItem>
                <MenuItem value={"female"}>Nữ</MenuItem>
                <MenuItem value={"other"}>Khác</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Địa chỉ"
              required
              name="address"
              defaultValue={user?.address}
              sx={{ width: "45%" }}
            />
            <TextField
              label="Link cá nhân"
              required
              name="social"
              defaultValue={user?.dayOfBirth}
              sx={{ width: "45%" }}
            />
          </Box>
          <Box>
            <Typography fontWeight={600}>Giới thiệu bản thân</Typography>
            <Divider />
            <TextField
              multiline
              rows={2}
              name="description"
              defaultValue={user?.description}
              fullWidth
            />
          </Box>

          <LoadingButton
            loading={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
            type="submit"
            color="error"
          >
            Cập nhật
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
