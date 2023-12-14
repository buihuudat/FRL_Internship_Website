import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useEffect, useState } from "react";
import {
  useDeleteJobMutation,
  useGetCompanyDetailsQuery,
} from "../api/admin/adminApi";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCreateModal } from "../slice/jobSlice";

const JobItem = (job) => {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [skills, setSkills] = useState([]);

  const { pathname } = useLocation();

  const { data } = useGetCompanyDetailsQuery(job.company);
  const [deleteJob] = useDeleteJobMutation();

  useEffect(() => {
    setCompany(data);
    setSkills(job.jobSkills?.split(","));
    setIsLoading(false);
  }, [job, data]);

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
    await toast.promise(deleteJob(job._id), {
      loading: "Đang xóa công việc",
      success: "Xóa công việc thành công",
      error: "Xóa công việc thất bại",
    });
  };

  const dispatch = useDispatch();
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

  return (
    <Box
      sx={{
        padding: 2,
        border: "2px solid red",
        borderRadius: 5,
        width: 500,
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "white",
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: "600" }}>
        {job.jobTitle}
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar src={company?.image} variant="square" />
          <Typography fontSize={25} pl={2}>
            {company?.name}
          </Typography>
        </Box>
      )}
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocationOnIcon color="error" />
          <Typography color={"red"} fontWeight={600}>
            Cách {company?.scale} km
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
          <ApartmentIcon />
          <Typography fontWeight={600}>{job.jobLocation}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CurrencyExchangeIcon />
          <Typography fontWeight={600}>{job.salary}</Typography>d
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {!isLoading &&
          skills?.map((skill, i) => <Skill key={i} skill={skill} />)}
      </Box>

      {pathname.includes("admin") && (
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default JobItem;
