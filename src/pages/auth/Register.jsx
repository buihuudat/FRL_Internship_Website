import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { authApi } from "../../utils/api/authApi";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();

  const [errText, setErrText] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    let err = false;

    if (data.username.length < 6) {
      setErrText((prev) => ({
        ...prev,
        username: "Tài khoản yêu cầu tối thiểu là 6 kí tự",
      }));
      err = true;
    }
    if (data.password.length < 6) {
      setErrText((prev) => ({
        ...prev,
        password: "Mật khẩu yêu cầu tối thiểu là 6 kí tự",
      }));
      err = true;
    }

    if (data.password !== data.confirmPassword) {
      setErrText((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu không khớp",
      }));
      err = true;
    }

    if (err) return;

    try {
      await toast.promise(authApi.signup(data), {
        loading: "Đang đăng ký",
        success: "Đăng ký thành công",
        error: (err) => err.response.data.message,
      });
      navigate("/dang-nhap");
    } catch (error) {
      toast.error("Đăng ký thất bại");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "black",
          borderRadius: 10,
          padding: 5,
          width: 500,
          gap: 3,
        }}
        onSubmit={handleSubmit}
      >
        <Typography fontWeight={600} fontSize={25} align="center">
          Đăng ký
        </Typography>

        <TextField
          label="Tên đăng nhập"
          variant="standard"
          required
          name="username"
          error={errText.username !== ""}
          helperText={errText.username}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Email"
          variant="standard"
          type="email"
          required
          name="email"
          error={errText.email !== ""}
          helperText={errText.email}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Mật khẩu"
          name="password"
          required
          variant="standard"
          type={showPass ? "standard" : "password"}
          error={errText.password !== ""}
          helperText={errText.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass(!showPass)}>
                  {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          variant="standard"
          type={showConfirmPass ? "standard" : "password"}
          error={errText.confirmPassword !== ""}
          helperText={errText.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={<Checkbox onChange={() => setIsDisable(!isDisable)} />}
          label={
            <Typography>
              Tôi đã đọc và đồng ý{" "}
              <Link style={{ textDecoration: "none", color: "red" }}>
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link style={{ textDecoration: "none", color: "red" }}>
                Chính sách riêng tư
              </Link>{" "}
              của INTERNSHIP liên quan đến thông tin riêng tư của tôi.
            </Typography>
          }
        />

        <LoadingButton
          disabled={isDisable}
          fullWidth
          variant="contained"
          sx={{ background: "#1B2543" }}
          type="submit"
        >
          Đăng ký
        </LoadingButton>
        <Typography>
          Bạn chưa có tài khoản?{" "}
          <Link
            style={{ color: "red", fontWeight: "600", textDecoration: "none" }}
            to={"/dang-nhap"}
          >
            Đăng nhập ngay
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
