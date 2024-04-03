import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../slice/jobSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { jobApi } from "../utils/api/jobApi";
import { address } from "../actions/userAddress";
import { getGeocoding } from "../actions/getGeocoding";
import { getDistance } from "../actions/getDistance";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";

const Skill = ({ name }) => {
  return (
    <Typography
      sx={{
        px: 1,
        pt: 0.3,
        borderRadius: 20,
        width: "max-content",
        border: "1px solid gray",
        fontWeight: 600,
        color: "gray",
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
  const { jobSelected, modal } = useSelector((state) => state.job);

  const [showFull, setShowFull] = useState(
    () => jobSelected.jobDescription > 200
  );

  const [jobApplied, setJobApplied] = useState([]);
  const [geo1, setGeo1] = useState(null);
  const [geo2, setGeo2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await jobApi.cvApplied(jobSelected._id);
      setJobApplied(data);
    };
    fetchData();
  }, [jobSelected._id]);

  useEffect(() => {
    if (jobSelected.company && jobSelected.company.address) {
      getGeocoding(
        address({ ...jobSelected.company.address, street: "" })
      ).then((data) => setGeo1([data.lat, data.lon]));
    }
    if (user && user.address) {
      if (user.address.lat && user.address.lng) {
        setGeo2([user.address.lat, user.address.lng]);
      } else {
        getGeocoding(address({ ...user.address, street: null })).then((data) =>
          setGeo2([data.lat, data.lon])
        );
      }
    }
  }, [jobSelected, user, modal]);

  const isApplied =
    useMemo(() => {
      const thisJob = jobApplied.find((j) => j.user?._id === user?._id);
      if (!thisJob) return false;
      return true;
    }, [jobApplied, user?._id]) || null;

  const handleApply = () => {
    if (!user) return toast.error("Bạn chưa đăng nhập");
    dispatch(showModal({ show: true, data: jobSelected }));
  };

  const distance = useMemo(() => {
    if (!geo1 || !geo2) return null;
    return getDistance(geo1, geo2);
  }, [geo1, geo2]);

  return jobSelected && jobApplied ? (
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
          sx={{ width: 100, height: 100, cursor: "pointer" }}
          src={jobSelected.company?.image}
        />
        <Box ml={2}>
          <Typography
            fontWeight={700}
            fontSize={25}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/company/${jobSelected.company._id}`)}
          >
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
            <CurrencyExchangeIcon color="warning" />
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
        disabled={isApplied === true || isApplied === null}
      >
        {isApplied === true ? "Bạn đã ứng tuyển" : "  Ứng tuyển"}
      </Button>

      <Divider sx={{ height: 2, py: 2 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SocialDistanceIcon color="error" sx={{ fontSize: 30 }} />
          <Typography color={"red"} fontWeight={600}>
            {distance ? (
              `Khoảng cách của bạn: ${distance}`
            ) : (
              <CircularProgress color="error" size={20} />
            )}
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
          <ApartmentIcon color="info" sx={{ fontSize: 30 }} />
          <Typography fontWeight={600}>
            {address(jobSelected.jobLocation)}
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
          <AccessAlarmIcon color="warning" sx={{ fontSize: 30 }} />
          <Typography fontWeight={600}>{jobSelected.wotkingForm}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography fontWeight={600} fontSize={20} width={120}>
            Kỹ năng:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {jobSelected.jobSkills?.split(",").map((skill, i) => (
              <Skill key={i} name={skill} />
            ))}
          </Box>
        </Box>

        <Divider sx={{ pt: 2 }} />

        <Box>
          <Typography fontSize={25} fontWeight={600} color={"orange"}>
            {jobSelected.company?.name}
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
              <Typography color={"gray"}>Mô hình công ty</Typography>
              <Typography fontWeight={600}>Doanh nghiệp</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"gray"}>Quy mô công ty</Typography>
              <Typography fontWeight={600}>50-150 nhân viên</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"gray"}>Quốc gia</Typography>
              <Typography fontWeight={600}>
                {jobSelected.company?.country}
              </Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"gray"}>Thời gian làm việc</Typography>
              <Typography fontWeight={600}>Thứ 2 - Thứ 6</Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography color={"gray"}>Làm việc ngoài giờ</Typography>
              <Typography fontWeight={600}>
                {jobSelected.company?.ot}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ pt: 2 }} />

        <Box>
          <Typography fontSize={25} fontWeight={600}>
            Thông tin chi tiết
          </Typography>
          <Typography>
            {!showFull
              ? jobSelected?.jobDescription
              : jobSelected?.jobDescription?.slice(0, 200) + "..."}
            {jobSelected?.jobDescription.length > 200 ? (
              <a
                onClick={() => setShowFull(!showFull)}
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  cursor: "pointer",
                  paddingLeft: 10,
                }}
              >
                {!showFull ? "Hiện thêm" : "Ẩn bớt"}
              </a>
            ) : null}
          </Typography>
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
