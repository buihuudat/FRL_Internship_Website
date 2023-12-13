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
import toast from "react-hot-toast";
import { useGetCompanyQuery } from "../api/admin/adminApi";

const JobModal = () => {
  const [value, setValue] = useState(0);
  const [form, setForm] = useState("Online");
  const [salary, setSalary] = useState("Thỏa thuận");
  const [scale, setScale] = useState("Dưới 1km");
  const [ot, setOt] = useState(0);
  const [kn, setKn] = useState("Không yêu cầu kinh nghiệm");
  const [company, setCompany] = useState(undefined);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setCreateModal({ show: false, data: null }));
  };

  const open = useSelector((state) => state.job.createModal.show);
  const companyData = useGetCompanyQuery();

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
    const formData = new FormData(e.target);
    const data = {
      jobtitle: formData.get("jobTitle"),
      jobdescription: formData.get("jobDescription"),
      jobSkills: formData.get("jobSkills"),
      jobLocation: formData.get("jobLocation"),
      wotkingForm: form,
      jobExperience: kn,
      salary,
      scale,
      jobStatus: !value ? "Active" : "No active",
      ot: !ot ? "Có tăng ca" : "Không tăng ca",
    };

    if (data.jobtitle.length < 10)
      return toast.error("Tên công việc không hợp lệ");
    if (data.jobdescription.length < 10)
      return toast.error("Mô tả công việc không hợp lệ");
    if (data.jobLocation.length < 10)
      return toast.error("Địa điểm làm việc không hợp lệ");

    console.log(data);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <Typography fontWeight={600} fontSize={25} align="center">
            Thêm công việc mới
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Công ty</InputLabel>
            <Select
              value={company}
              label="Công ty"
              onChange={(e) => setCompany(e.target.value)}
            >
              {companyData.data.map((data, i) => (
                <MenuItem value={data.w} key={i}>
                  {data.w}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Tên công việc" name="jobTitle" fullWidth required />
          <TextField
            label="Thông tin công việc"
            name="jobDescription"
            fullWidth
            multiline
            required
            rows={3}
          />
          <TextField label="Địa điểm làm việc" name="jobLocation" required />

          <TextField
            label="Kỹ năng cần có"
            name="jobSkills"
            placeholder="React, Node, PHP, ..."
            required
          />

          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <RadioGroup
                value={value}
                onChange={(e) => setValue(+e.target.value)}
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
            <FormControl>
              <FormLabel>Tăng ca</FormLabel>
              <RadioGroup value={ot} onChange={(e) => setOt(+e.target.value)}>
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Cần tăng ca"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Không tăng ca"
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
                onChange={(e) => setScale(e.target.value)}
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
                onChange={(e) => setSalary(e.target.value)}
              >
                {data.salary.map((data, i) => (
                  <MenuItem value={data.s} key={i}>
                    {data.s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 250 }}>
              <InputLabel>Kinh nghiệm làm việc</InputLabel>
              <Select
                value={kn}
                label="Kinh nghiệm làm việc"
                onChange={(e) => setKn(e.target.value)}
              >
                {data.jobExperience.map((data, i) => (
                  <MenuItem value={data.j} key={i}>
                    {data.j}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <Button variant="contained" color="success" fullWidth type="submit">
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
