import {
  Box,
  LinearProgress,
  Paper,
  SpeedDial,
  SpeedDialIcon,
} from "@mui/material";
import { useGetCompanyQuery } from "../../api/admin/adminApi";
import { useDispatch } from "react-redux";
import { setCreateModal } from "../../slice/jobSlice";
import JobModal from "../../components/JobModal";

const JobItem = () => <Paper>123</Paper>;

const Popup = () => {
  const dispatch = useDispatch();

  const handleCreateJob = () => {
    dispatch(setCreateModal({ show: true }));
  };
  return (
    <Box
      sx={{
        height: "80%",
        width: "100%",
      }}
    >
      <SpeedDial
        onClick={handleCreateJob}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      />
      <JobModal />
    </Box>
  );
};

const Jobs = () => {
  const { data, isLoading } = useGetCompanyQuery();
  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box>
      {data.map((job) => (
        <JobItem key={job._id} />
      ))}

      <Popup />
    </Box>
  );
};

export default Jobs;
