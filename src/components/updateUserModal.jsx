import Box from "@mui/material/Box";
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
import { useState } from "react";
import FileBase64 from "react-file-base64";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

import { useUpdateUserMutation } from "../api/admin/adminApi";
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

const UpdateUserModal = () => {
  const open = useSelector((state) => state.user.modal.show);
  const user = useSelector((state) => state.user.modal.data);

  const [avatar, setAvatar] = useState(user?.avatar);
  const [gender, setGender] = useState(user?.gender);
  const [role, setRole] = useState(user?.role);

  const dispatch = useDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

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
      username: user?.username,
      name: formData.get("name") || user?.name,
      email: formData.get("email") || user?.email,
      phone: formData.get("phone") || user?.phone,
      address: formData.get("address") || user?.address,
      birthday: formData.get("birthday") || user?.birthday,
      description: formData.get("description") || user?.description,
      social: formData.get("social") || user?.social,
      avatar: avatar || user?.avatar,
      gender: gender || user?.gender,
      role: role || user?.role,
    };

    // if (data.name.length < 6) return toast.error("Tên không hợp lệ");
    // if (data.email.length < 6) return toast.error("Email không hợp lệ");
    // if (data.phone.length < 10 || data.phone.length > 11)
    //   return toast.error("Số điện thoại không hợp lệ");
    // if (data.phone.length < 10) return toast.error("Địa chỉ không hợp lệ");

    await toast
      .promise(updateUser(data), {
        loading: "Đang cập nhật",
        success: "Cập nhật thành công",
        error: "Cập nhật thất bại",
      })
      .then(() => {
        handleClose();
      });
  };

  const handleChangeAvatar = (e) => {
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
            Cập nhật người dùng
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
              src={user?.avatar || avatar}
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
                defaultValue={user?.gender || gender}
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
              defaultValue={user?.social}
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
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel>Quyền hạn</InputLabel>
            <Select
              defaultValue={user?.role || role}
              label="Quyền hạn"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"user"}>User</MenuItem>
            </Select>
          </FormControl>

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

export default UpdateUserModal;
