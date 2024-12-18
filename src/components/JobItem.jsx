import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppliedModal,
  setCreateModal,
  setJobSelected,
} from "../slice/jobSlice";
import { jobApi } from "../utils/api/jobApi";
import { useEffect, useState } from "react";
import { permissionAccess } from "../resources/data";
import { address } from "../actions/userAddress";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const JobItem = (job) => {
  const { pathname } = useLocation();
  const company = job?.company;
  const user = useSelector((state) => state.user.user);

  const [jobApplied, setJobApplied] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (permissionAccess.includes(user?.role)) {
      const fetchData = async () => {
        const data = await jobApi.cvApplied(job._id);
        setJobApplied(data);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [user?.role, job._id]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Skill = ({ skill }) => {
    return (
      <Typography
        sx={{
          px: 1,
          borderRadius: 20,
          width: "max-content",
          border: "1px solid #000",
        }}
      >
        {skill}
      </Typography>
    );
  };

  const handleDelete = async () => {
    await toast
      .promise(jobApi.deleteJob(job._id), {
        loading: "Đang xóa công việc",
        success: "Xóa công việc thành công",
        error: "Xóa công việc thất bại",
      })
      .then(() => window.location.reload());
  };

  const handleUpdate = () => {
    dispatch(
      setCreateModal({
        show: true,
        data: {
          job,
          company,
        },
      })
    );
  };

  const handleViewJob = () => {
    navigate(`/${job._id}`);
    dispatch(setJobSelected(job));
  };
  const handleViewCompany = () => {
    navigate(`/${company._id}`, { company });
  };

  const handleViewUserApplied = () => {
    dispatch(setAppliedModal({ open: true, data: jobApplied }));
  };

  return (
    <Paper
      sx={{
        width: 500,
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "white",
        borderRadius: 5,
      }}
    >
      <Box
        onClick={handleViewJob}
        sx={{
          padding: 2,
          border: `2px solid ${pathname.includes(job?._id) ? "red" : "white"}`,
          borderRadius: 5,
          width: "100%",
          height: "max-content",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar
            src={company?.image}
            variant="square"
            onClick={handleViewCompany}
            style={{ cursor: "pointer", borderRadius: 3 }}
          />
          <Typography fontSize={25} pl={2} textTransform={"capitalize"}>
            {company?.name}
          </Typography>
        </Box>

        <Typography
          sx={{ fontSize: 20, fontWeight: "600", mt: 3 }}
          textTransform={"capitalize"}
        >
          {/* {job.jobTitle?.length > 40
            ? job.jobTitle.slice(0, 40) + "..."
            : job.jobTitle} */}
          {job.jobTitle}
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocationOnIcon color="error" />
            <Typography color={"red"} fontWeight={600}>
              {job?.jobLocation_str || 0} km
            </Typography>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ApartmentIcon color="primary" />
            <Typography fontWeight={600}>
              {address(job.jobLocation)?.length > 40
                ? address(job.jobLocation).slice(0, 40) + "..."
                : address(job.jobLocation)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CurrencyExchangeIcon color="warning" />
            <Typography fontWeight={600}>{job.salary}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AccessTimeIcon color="success" />
            <Typography fontWeight={600} color={"gray"}>
              {moment(job.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {company?.skill?.map((skill, i) => (
            <Skill key={i} skill={skill} />
          ))}
        </Box>
      </Box>
      {pathname.includes("admin") && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            padding: 1,
            marginTop: "auto",
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ width: "45%" }}
            >
              Xoá
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{ width: "45%" }}
            >
              Cập nhật
            </Button>
          </Box>
          {isLoading ? (
            <CircularProgress sx={{ m: "auto" }} />
          ) : (
            <Button
              flex={1}
              variant="outlined"
              color="success"
              onClick={handleViewUserApplied}
              sx={{ borderRadius: "50px" }}
            >
              View {jobApplied.length} User Applied
            </Button>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default JobItem;
