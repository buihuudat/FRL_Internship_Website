import { Avatar, Box, Button, Divider, Typography } from "@mui/material";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../slice/jobSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Skill = ({ name }) => {
  return (
    <Typography
      sx={{
        px: 1,
        borderRadius: 20,
        width: "max-content",
        border: "1px solid #000",
      }}
    >
      {name}
    </Typography>
  );
};
const JobDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const jobSelected = useSelector((state) => state.job.jobSelected);

  const isApplied = jobSelected?.jobApplied.find((j) => j.userId === user._id);

  const handleApply = () => {
    if (!user) return toast.error("Bạn chưa đăng nhập");
    dispatch(showModal({ show: true, data: jobSelected }));
  };

  return jobSelected ? (
    <Box
      sx={{
        border: "2px solid #999",
        padding: 2,
        borderRadius: 5,
        minHeight: 500,
        backgroundColor: "white",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          onClick={() => navigate(`/company/${jobSelected.company._id}`)}
          variant="square"
          alt="img-company"
          sx={{ width: 100, height: 100 }}
          src={jobSelected.company?.image}
        />
        <Box ml={2}>
          <Typography fontWeight={700} fontSize={25}>
            {jobSelected.jobTitle}
          </Typography>
          <Typography fontWeight={600}>{jobSelected.company?.name}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            <CurrencyExchangeIcon />
            <Typography fontWeight={600} fontSize={20}>
              {jobSelected.salary}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ p: 1, fontSize: 25, borderRadius: 5, mt: 4 }}
        onClick={handleApply}
        disabled={isApplied}
      >
        {isApplied ? "Bạn đã ứng tuyển" : "  Ứng tuyển"}
      </Button>

      <Divider sx={{ height: 2, py: 2 }} />

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocationOnIcon color="error" sx={{ fontSize: 30 }} />
          <Typography color={"red"} fontWeight={600}>
            Cách {jobSelected.company?.scale} km
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
          <ApartmentIcon sx={{ fontSize: 30 }} />
          <Typography fontWeight={600}>{jobSelected.jobLocation}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AccessAlarmIcon sx={{ fontSize: 30 }} />
          <Typography fontWeight={600}>{jobSelected.wotkingForm}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography fontWeight={600} fontSize={20}>
            Kỹ năng:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            {jobSelected.jobSkills?.split(",").map((skill, i) => (
              <Skill key={i} name={skill} />
            ))}
          </Box>
        </Box>

        <Divider sx={{ pt: 2 }} />

        <Box>
          <Typography fontSize={25} fontWeight={600}>
            ten cong ty
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              gap: 3,
            }}
          >
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Mô hình công ty</Typography>
              <Typography fontWeight={600}>Doanh nghiệp</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Quy mô công ty</Typography>
              <Typography fontWeight={600}>50-150 nhân viên</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Quốc gia</Typography>
              <Typography fontWeight={600}>
                {jobSelected.company?.country}
              </Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Thời gian làm việc</Typography>
              <Typography fontWeight={600}>Thứ 2 - Thứ 6</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"#333"}>Làm việc ngoài giờ</Typography>
              <Typography fontWeight={600}>
                {jobSelected.company?.ot}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        border: "2px solid #999",
        padding: 2,
        borderRadius: 5,
        minHeight: 500,
        backgroundColor: "white",
      }}
    >
      <Typography
        fontSize={30}
        fontWeight={600}
        align="center"
        fontStyle={"italic"}
      >
        Hãy chọn một công việc
      </Typography>
    </Box>
  );
};

export default JobDetails;
