import { Box, LinearProgress, SpeedDial, SpeedDialIcon } from "@mui/material";
import { setModal } from "../../slice/companySlice";
import { useDispatch } from "react-redux";
import CompanyModal from "../../components/companyModal";
import { useGetCompanyQuery } from "../../api/admin/adminApi";
import CompanyItem from "../../components/CompanyItem";
import JobModal from "../../components/JobModal";

const Popup = () => {
  const dispatch = useDispatch();
  const handleCreateCompany = () => {
    dispatch(setModal({ show: true }));
  };

  return (
    <Box
      sx={{
        height: "80%",
        width: "100%",
      }}
    >
      <SpeedDial
        onClick={handleCreateCompany}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      />
    </Box>
  );
};

const Company = () => {
  const { data, isLoading } = useGetCompanyQuery();

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box>
      <Box p={2} sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {!isLoading &&
          data.map((company) => <CompanyItem key={company._id} {...company} />)}
      </Box>
      <Popup />
      <CompanyModal />
      <JobModal />
    </Box>
  );
};

export default Company;
