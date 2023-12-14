import { Box, LinearProgress, SpeedDial, SpeedDialIcon } from "@mui/material";
import { useGetCompanyQuery, useGetJobsQuery } from "../../api/admin/adminApi";
import { useDispatch } from "react-redux";
import { setCreateModal } from "../../slice/jobSlice";
import JobModal from "../../components/JobModal";
import JobItem from "../../components/JobItem";

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
  const { data, isLoading } = useGetJobsQuery();

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box
      p={3}
      sx={{ display: "flex", flexDirection: "row", gap: 3, flexGrow: 1 }}
    >
      {!isLoading && data?.map((job) => <JobItem key={job._id} {...job} />)}
      <Popup />
    </Box>
  );
};

export default Jobs;
