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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/userSlice";
import { authApi } from "../../utils/api/authApi";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const result = await toast.promise(authApi.login(data), {
        loading: "Đang đăng nhập",
        success: "Đăng nhập thành công",
        error: (err) => err.response.data.message,
      });

      localStorage.setItem("token", result.token);
      dispatch(setUser(result.user));
      navigate("/");
    } catch (error) {
      toast.error("Đăng nhập thất bại");
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
          gap: 5,
        }}
        onSubmit={handleSubmit}
      >
        <Typography fontWeight={600} fontSize={25} align="center">
          Đăng nhập
        </Typography>
        <TextField
          label="Email"
          variant="standard"
          type="email"
          name="email"
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
          variant="standard"
          type={showPass ? "standard" : "password"}
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={<Checkbox onChange={() => setChecked(!checked)} />}
            label="Ghi nhớ cho lần sau"
          />
          <Typography>Quên mật khẩu?</Typography>
        </Box>

        <LoadingButton
          fullWidth
          variant="contained"
          sx={{ background: "#1B2543" }}
          type="submit"
        >
          Đăng nhập
        </LoadingButton>
        <Typography>
          Bạn chưa có tài khoản?{" "}
          <Link
            style={{ color: "red", fontWeight: "600", textDecoration: "none" }}
            to={"/dang-ky"}
          >
            Đăng ký ngay
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
