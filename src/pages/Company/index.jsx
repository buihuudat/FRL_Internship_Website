import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import JobItem from "../../components/JobItem";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate, useParams } from "react-router-dom";
import { address } from "../../actions/userAddress";
import { useEffect, useMemo, useState } from "react";
import { companyApi } from "../../utils/api/companyApi";
import Comment from "../../components/Comment";
import { commentApi } from "../../utils/api/commentApi";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import { useSelector } from "react-redux";
import { getGeocoding } from "../../actions/getGeocoding";
import { getDistance } from "../../actions/getDistance";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import EmailIcon from "@mui/icons-material/Email";

const Company = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [jobsOfCompany, setJobsOfCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [geo1, setGeo1] = useState(null);
  const [geo2, setGeo2] = useState(null);

  // console.log({ 1: geo1, 2: geo2 });

  const user = useSelector((state) => state.user.user);

  // console.log(user.address);

  useEffect(() => {
    const getCompany = async () => {
      const [result, jobsOfCompany, comments] = await Promise.all([
        companyApi.getCompany(param?.id),
        companyApi.getCompanyJobs(param?.id),
        commentApi.getCommentByCompany(param?.id),
      ]);

      setCompany(result);
      setJobsOfCompany(jobsOfCompany);
      setIsLoading(false);
      setComments(comments);
    };
    getCompany();
  }, [param?.id]);

  useEffect(() => {
    if (!user) return;
    if (company && company.address) {
      getGeocoding(address({ ...company.address, street: null })).then((data) =>
        setGeo1([data.lat, data.lon])
      );
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
  }, [company, user]);

  const distance = useMemo(() => {
    if (!geo1 || !geo2) return null;
    return getDistance(geo1, geo2);
  }, [geo1, geo2]);

  return (
    <Box minHeight={"80vh"}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <Divider sx={{ color: "white" }} />
          <Box sx={{ display: "flex", gap: 3, px: 10 }}>
            <img
              src={company?.image}
              style={{
                borderRadius: 5,
                width: 200,
                height: 200,
                objectFit: "cover",
              }}
              alt="logo-company"
            />
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              <Typography fontWeight={600} color={"white"} fontSize={30}>
                {company?.name}
              </Typography>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <LocationOnIcon sx={{ color: "white" }} />
                  <Typography fontWeight={600} color={"white"} fontSize={20}>
                    {address(company?.address)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <BookmarksIcon sx={{ color: "white" }} />
                  <Typography fontWeight={600} color={"white"} fontSize={20}>
                    {jobsOfCompany?.length} việc làm đang tuyển dụng
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <SocialDistanceIcon sx={{ color: "white" }} />
                <Typography
                  fontWeight={600}
                  color={"white"}
                  fontSize={20}
                  sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                >
                  Khoảng cách đến công ty:{" "}
                  {distance ? (
                    distance
                  ) : (
                    <Skeleton
                      variant="text"
                      animation="pulse"
                      sx={{
                        fontSize: "1rem",
                        width: 50,
                        backgroundColor: "gray",
                      }}
                    />
                  )}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <EmailIcon sx={{ color: "white" }} />
                <Typography fontWeight={600} color={"white"} fontSize={20}>
                  Gửi email
                </Typography>
                <IconButton
                  sx={{
                    width: 50,
                    height: 50,
                    p: 2,
                    background: "rgba(165,219,146,.1)",
                    ml: 2,
                  }}
                  color="success"
                  onClick={() => navigate(`/company/${company._id}/send-email`)}
                >
                  <AttachEmailIcon color="success" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 5,
              background: "#ddd",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              px: 10,
            }}
          >
            <Box
              sx={{
                py: 3,
                width: "70%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Paper>
                <Typography
                  fontSize={23}
                  fontWeight={600}
                  color={"red"}
                  pl={5}
                  py={3}
                >
                  Giới thiệu
                </Typography>
              </Paper>

              <Paper>
                <Typography fontSize={23} fontWeight={600} pl={5} py={3}>
                  Thông tin công ty
                </Typography>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      textAlign: "start",
                      flexDirection: "column",
                      px: 5,
                      py: 1,
                    }}
                  >
                    <Typography>Mô hình công ty</Typography>
                    <Typography fontWeight={600} fontSize={18}>
                      Sản phẩm
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      textAlign: "start",
                      flexDirection: "column",
                      px: 5,
                      py: 1,
                    }}
                  >
                    <Typography>Quy mô công ty</Typography>
                    <Typography fontWeight={600} fontSize={18}>
                      {company?.scale}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      textAlign: "start",
                      flexDirection: "column",
                      px: 5,
                      py: 1,
                    }}
                  >
                    <Typography>Quốc gia</Typography>
                    <Typography fontWeight={600} fontSize={18}>
                      {company?.country}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      textAlign: "start",
                      flexDirection: "column",
                      px: 5,
                      py: 1,
                    }}
                  >
                    <Typography>Thời gian làm việc</Typography>
                    <Typography fontWeight={600} fontSize={18}>
                      Thứ 2 - thứ 6
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      textAlign: "start",
                      flexDirection: "column",
                      px: 5,
                      py: 1,
                    }}
                  >
                    <Typography>Giờ làm việc</Typography>
                    <Typography fontWeight={600} fontSize={18}>
                      {company?.ot}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Paper>
                <Typography
                  fontSize={23}
                  fontWeight={600}
                  color={"red"}
                  pl={5}
                  py={3}
                >
                  Giới thiệu công ty
                </Typography>
                <Divider />
                <Typography p={5} py={2} fontWeight={600}>
                  {company?.description}
                </Typography>
                <Divider />
                <Box
                  p={5}
                  pt={2}
                  display={"flex"}
                  alignItems={"center"}
                  gap={3}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LanguageIcon color="primary" />
                    <Typography color={"primary"} fontWeight={600}>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="/"
                        style={{ textDecoration: "none" }}
                      >
                        Website công ty
                      </a>
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FacebookIcon color="primary" />
                    <Typography color="primary" fontWeight={600}>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="/"
                        style={{ textDecoration: "none" }}
                      >
                        Fanpage Facebook
                      </a>
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Comment comments={comments} company={company} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
                maxHeight: 600,
                overflow: "auto",
              }}
            >
              {jobsOfCompany?.map((job) => (
                <JobItem key={job._id} {...job} company={company} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Company;
