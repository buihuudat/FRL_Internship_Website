import { Box, LinearProgress } from "@mui/material";
import CompanyModal from "../../components/companyModal";
import { useGetCompanyQuery } from "../../api/admin/adminApi";
import CompanyItem from "../../components/CompanyItem";
import JobModal from "../../components/JobModal";
import Popup from "../../components/Popup";

const Company = () => {
  const { data, isLoading } = useGetCompanyQuery();

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box>
      <Box p={2} sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {data.length &&
          data.map((company) => <CompanyItem key={company._id} {...company} />)}
      </Box>
      <Popup />
      <CompanyModal />
      <JobModal />
    </Box>
  );
};

export default Company;
