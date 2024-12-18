import { useEffect, useState } from "react";
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
import { address } from "../actions/userAddress";
import { jobApi } from "../utils/api/jobApi";
import CompanyAddress from "./CompanyAddress";
import { setJobs } from "../slice/jobSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "56%",
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

const JobModal = () => {
  const dataUpdate = useSelector((state) => state.job.createModal.data);
  const [value, setValue] = useState(dataUpdate?.company?.active || 0);
  const [form, setForm] = useState(dataUpdate?.job?.wotkingForm || "Online");
  const [salary, setSalary] = useState(
    dataUpdate?.company?.salary || "Thỏa thuận"
  );
  const [scale, setScale] = useState(dataUpdate?.job?.scale || "Dưới 1km");
  const [jobLocation_str, setJobLocation_str] = useState(
    dataUpdate?.job?.jobLocation_str || ""
  );
  const [time, setTime] = useState("Toàn thời gian");
  const [company, setCompany] = useState(dataUpdate?.company?._id || undefined);
  const [companyAuth, setCompanyAuth] = useState(dataUpdate?.job?.company);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(null);

  const open = useSelector((state) => state.job.createModal.show);
  const user = useSelector((state) => state.user.user);
  const companyData = useSelector((state) => state.company.companies);

  useEffect(() => {
    if (!dataUpdate?.job?.company && companyData.length)
      setCompanyAuth(companyData.find((c) => c._id === company));
  }, [dataUpdate, companyData, company]);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setCreateModal({ show: false, data: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      author: user.role === "admin" ? companyAuth?.author : user._id,
      jobTitle: formData.get("jobTitle"),
      jobDescription: formData.get("jobDescription"),
      jobSkills: formData.get("jobSkills"),
      jobLocation: newAddress ?? companyAuth?.address,
      wotkingForm: form,
      salary,
      scale,
      company: companyAuth?._id || company,
      jobStatus: value,
      time,
      jobLocation_str,
    };

    if (data.jobTitle.length < 10)
      return toast.error("Tên công việc không hợp lệ");
    if (data.jobDescription.length < 10)
      return toast.error("Mô tả công việc không hợp lệ");

    await toast
      .promise(
        dataUpdate
          ? jobApi.updateJob({ ...data, _id: dataUpdate.job._id })
          : jobApi.createJob(data),
        {
          loading: dataUpdate ? "Đang lưu" : "Đang tạo",
          success: dataUpdate ? "Cập nhật thành công" : "Tạo thành công",
          error: dataUpdate ? "Cập nhật thất bại" : "Tạo thất bại",
        }
      )
      .then(() => {
        jobApi.getJobsByRoot().then((jobs) => {
          // return console.log(res);
          dispatch(setJobs(jobs));
        });
        handleClose();
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component={"form"} onSubmit={handleSubmit}>
        <Typography fontWeight={600} fontSize={25} align="center">
          {dataUpdate ? "Cập nhật công việc" : "Thêm công việc mới"}
        </Typography>

        {user.role === "admin" && (
          <FormControl fullWidth>
            <InputLabel>Công ty</InputLabel>
            <Select
              value={dataUpdate?.company._id || company}
              label="Công ty"
              onChange={(e) => setCompany(e.target.value)}
            >
              {companyData?.map((data, i) => (
                <MenuItem value={data._id} key={i}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <TextField
          label="Tên công việc"
          defaultValue={dataUpdate?.job?.jobTitle}
          name="jobTitle"
          fullWidth
          required
        />
        <TextField
          label="Thông tin công việc"
          name="jobDescription"
          defaultValue={dataUpdate?.job?.jobDescription}
          fullWidth
          multiline
          required
          rows={3}
        />

        <TextField
          label="Kỹ năng cần có"
          name="jobSkills"
          defaultValue={dataUpdate?.job?.jobSkills}
          placeholder="React, Node, PHP, ..."
          required
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          {isChangeAddress ? (
            <CompanyAddress setInitialAddress={setNewAddress} />
          ) : (
            <TextField
              disabled
              value={
                companyAuth?.address
                  ? address(companyAuth?.address)
                  : address(dataUpdate?.job?.jobLocation)
              }
              name="jobLocation"
              required
              fullWidth
            />
          )}
          <Button onClick={() => setIsChangeAddress(!isChangeAddress)}>
            {isChangeAddress ? "Cancel" : "Change"}
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => setValue(+e.target.value)}
            >
              <FormControlLabel value={0} control={<Radio />} label="Active" />
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
              {data?.workForm.map((data, i) => (
                <MenuItem value={data.value} key={i}>
                  {data.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 150 }}>
            <InputLabel>Thời gian làm việc</InputLabel>
            <Select
              value={time}
              label="Hình thức làm việc"
              onChange={(e) => setTime(e.target.value)}
            >
              {data.time.map((data, i) => (
                <MenuItem value={data.value} key={i}>
                  {data.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl sx={{ width: 150 }}>
            <InputLabel>Khoảng cách</InputLabel>
            <Select
              value={scale}
              label="Hình thức làm việc"
              onChange={(e) => setScale(e.target.value)}
            >
              {data.scale.map((data, i) => (
                <MenuItem value={data.value} key={i}>
                  {data.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <FormControl sx={{ width: 150 }}>
            <InputLabel>Mức lương</InputLabel>
            <Select
              value={salary}
              label="Mức lương"
              onChange={(e) => setSalary(e.target.value)}
            >
              {data.salary.map((data, i) => (
                <MenuItem value={data.value} key={i}>
                  {data.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <Button variant="contained" color="success" fullWidth type="submit">
            Lưu
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
  );
};

export default JobModal;
