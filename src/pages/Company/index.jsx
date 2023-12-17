import { faker } from "@faker-js/faker";
import {
  Box,
  Divider,
  LinearProgress,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import JobItem from "../../components/JobItem";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useParams } from "react-router-dom";
import {
  useGetCompanyDetailsQuery,
  useGetCompanyJobsQuery,
} from "../../api/admin/adminApi";

const index = () => {
  const param = useParams();
  const { data: jobsOfCompany } = useGetCompanyJobsQuery({ id: param?.id });
  const {
    data: company,
    error,
    isLoading,
  } = useGetCompanyDetailsQuery(param?.id);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box>
      <Divider sx={{ color: "white" }} />
      <Box sx={{ display: "flex", gap: 5, px: 10 }}>
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
        <Box>
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
                {company?.address}
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
        </Box>
      </Box>
      <Box
        sx={{
          mt: 5,
          background: "#999",
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            px: 10,
            py: 3,
            width: "70%",
            display: "flex",
            flexDirection: "column",
            gap: 5,
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
            <Box p={5} pt={2} display={"flex"} alignItems={"center"} gap={3}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LanguageIcon color="primary" />
                <Typography color={"primary"} fontWeight={600}>
                  <a rel="noopener noreferrer" target="_blank">
                    Website công ty
                  </a>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FacebookIcon color="primary" />
                <Typography color="primary" fontWeight={600}>
                  Fanpage Facebook
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}
        >
          {jobsOfCompany?.map((job) => (
            <JobItem key={job._id} {...job} company={company} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default index;
