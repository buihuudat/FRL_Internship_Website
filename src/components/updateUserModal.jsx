import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../slice/userSlice";
import {
  Avatar,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import UserAddress from "./UserAddress";
import { userApi } from "../utils/api/userApi";
import { address } from "../actions/userAddress";
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
  const userData = useSelector((state) => state.user.modal.data);

  const [user, setUser] = useState(userData);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [gender, setGender] = useState(user?.gender);
  const [role, setRole] = useState(user?.role);

  const dispatch = useDispatch();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const handleClose = () => {
    dispatch(setModal({ show: false, data: null }));
  };

  const handleChangeGender = () => {
    if (user.gender === "male") {
      setGender("female");
    } else {
      setGender("male");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      _id: user._id,
      username: user?.username,
      name: formData.get("name") || user?.name,
      email: formData.get("email") || user?.email,
      phone: formData.get("phone") || user?.phone,
      address: user?.address,
      birthday: formData.get("birthday") || user?.birthday,
      description: formData.get("description") || user?.description,
      social: formData.get("social") || user?.social,
      avatar: avatar || user?.avatar,
      gender: gender || user?.gender,
      role: role || user?.role,
    };

    await toast
      .promise(userApi.updateUserById(data), {
        loading: "Đang cập nhật",
        success: "Cập nhật thành công",
        error: "Cập nhật thất bại",
      })
      .then(() => {
        window.location.reload();
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {user ? (
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
              label="Tên"
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
              label="Link cá nhân"
              required
              name="social"
              defaultValue={user?.social}
              fullWidth
            />
          </Box>

          <Paper levation={3} sx={{ p: 3, m: 2 }}>
            <Typography>
              Địa chỉ hiện tại:{" "}
              <b>
                <i>{address(user?.address)}</i>
              </b>
            </Typography>

            <UserAddress user={user} setUser={setUser} />
          </Paper>

          <Box>
            <Typography fontWeight={600}>Giới thiệu</Typography>
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
              <MenuItem value={"company"}>Company</MenuItem>
              <MenuItem value={"user"}>User</MenuItem>
            </Select>
          </FormControl>

          <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
            type="submit"
            color="error"
          >
            Cập nhật
          </LoadingButton>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Modal>
  );
};

export default UpdateUserModal;
