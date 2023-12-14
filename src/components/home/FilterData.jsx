import { Box, LinearProgress, Typography } from "@mui/material";
import JobItem from "../JobItem";
import JobDetails from "../JobDetails";
import { useGetJobsQuery } from "../../api/admin/adminApi";
import { useState } from "react";

const FilterData = () => {
  const { data, error, isLoading } = useGetJobsQuery();
  const [dataFilted, setDataFilted] = useState(data);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#ECECEC",
        display: "flex",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <Typography fontSize={23} fontWeight={600}>
          {data?.length} công việc phù hợp
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {isLoading ? (
            <LinearProgress />
          ) : (
            data.map((job) => <JobItem key={job._id} {...job} />)
          )}
        </Box>
      </Box>
      <Box sx={{ width: "40%", margin: 4 }}>
        <JobDetails />
      </Box>
    </Box>
  );
};

export default FilterData;
