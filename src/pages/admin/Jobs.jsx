import { Box, CircularProgress, SpeedDial, SpeedDialIcon } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreateModal } from "../../slice/jobSlice";
import JobModal from "../../components/JobModal";
import JobItem from "../../components/JobItem";
import JobAppliedModal from "../../components/jobAppliedModal";
import DetailCVmodal from "../../components/detailCVmodal";

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
  const jobs = useSelector((state) => state.job.jobs);

  const isLoading = false;

  return isLoading ? (
    <Box display={"flex"} sx={{ m: "0 auto", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box
      p={3}
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
        flexGrow: 1,
        flexWrap: "wrap",
      }}
    >
      {!isLoading && jobs?.map((job) => <JobItem key={job._id} {...job} />)}
      <Popup />
      <JobAppliedModal />
      <DetailCVmodal />
    </Box>
  );
};

export default Jobs;
