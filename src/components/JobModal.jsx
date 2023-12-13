import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCreateModal } from "../slice/jobSlice";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { data } from "../sources/data";

const JobModal = () => {
  const [value, setValue] = useState(0);
  const [form, setForm] = useState("Online");
  const [salary, setSalary] = useState("Thỏa thuận");
  const [scale, setScale] = useState("Dưới 1km");

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setCreateModal({ show: false, data: null }));
  };

  const open = useSelector((state) => state.job.createModal.show);

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
            Thêm công việc mới
          </Typography>

          <TextField label="Tên công việc" name="jobTitle" fullWidth required />
          <TextField
            label="Thông tin công việc"
            name="jobDescription"
            fullWidth
            multiline
            required
            rows={3}
          />
          <TextField label="Lương" name="salary" required />
          <TextField label="Địa điểm làm việc" name="jobLocation" required />
          <TextField label="Kinh nghiệm cần có" name="jobExperience" required />
          <TextField
            label="Kỹ năng cần có"
            name="jobSkills"
            placeholder="React, Node, PHP"
            required
          />

          <Box sx={{ display: "flex", gap: 3 }}>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <RadioGroup
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Active"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="No Active"
                />
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ width: 150 }}>
              <InputLabel>Hình thức làm việc</InputLabel>
              <Select
                value={form}
                label="Hình thức làm việc"
                onChange={(e) => setForm(e.target.value)}
              >
                {data.workForm.map((data, i) => (
                  <MenuItem value={data.w} key={i}>
                    {data.w}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 150 }}>
              <InputLabel>Khoảng cách</InputLabel>
              <Select
                value={scale}
                label="Hình thức làm việc"
                onChange={(e) => setForm(e.target.value)}
              >
                {data.scale.map((data, i) => (
                  <MenuItem value={data.s} key={i}>
                    {data.s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 150 }}>
              <InputLabel>Mức lương</InputLabel>
              <Select
                value={salary}
                label="Mức lương"
                onChange={(e) => setForm(e.target.value)}
              >
                {data.salary.map((data, i) => (
                  <MenuItem value={data.s} key={i}>
                    {data.s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

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

export default JobModal;
