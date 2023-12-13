import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../slice/companySlice";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import FileBase64 from "react-file-base64";
import toast from "react-hot-toast";

const CompanyModal = () => {
  const [value, setValue] = useState(0);
  const [image, setImage] = useState(undefined);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModal({ show: false, data: null }));
  };

  const open = useSelector((state) => state.company.modal.show);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    gap: 2,
    overflow: "auto",
    maxHeight: "100%",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.targer);
    const data = {
      image,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      website: formData.get("website"),
      description: formData.get("description"),
      ot: value,
    };

    console.log(data);
  };
  const handleDone = (e) => {
    if (e.type !== "image/png") return toast.error("Ảnh không hợp lệ");
    setImage(e.base64);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <Typography fontWeight={600} fontSize={25} align="center">
            Thêm công ty mới
          </Typography>

          <Box>
            {image && image !== "" && (
              <img
                src={image}
                alt="img-company"
                style={{ margin: "0 auto", display: "flex", width: 200 }}
              />
            )}
            <FileBase64 onDone={handleDone} />
          </Box>

          <TextField label="Tên công ty" name="name" fullWidth required />
          <TextField label="Địa chỉ" name="address" fullWidth required />
          <TextField
            label="Giới thiệu công ty"
            name="description"
            multiline
            required
            rows={3}
            fullWidth
          />
          <Box display={"flex"} gap={3}>
            <TextField label="Quy mô" name="scale" required />
            <TextField label="Quốc gia" name="country" required />
            <TextField label="Website" name="Link website" required />
            <TextField label="Facebook" name="Link facebook" required />
          </Box>

          <FormControl>
            <FormLabel>Tăng ca</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Không tăng ca"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Cần tăng ca"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="success"
              fullWidth
              type="submit"
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              color="error"
              fullWidth
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CompanyModal;
