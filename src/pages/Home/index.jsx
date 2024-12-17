import { useEffect, useState } from "react";
import Filter from "../../components/home/Filter";
import { Box, Typography } from "@mui/material";
import FilterData from "../../components/home/FilterData";
import ApplyModal from "../../components/ApplyModal";
import NotificationModal from "../../components/NotificationModal";
import { useDispatch, useSelector } from "react-redux";
import { setJobSelected, setJobsResult } from "../../slice/jobSlice";

import image1 from "../../assets/images/img1.jpg";
import image2 from "../../assets/images/img2.jpg";
import image3 from "../../assets/images/img3.jpg";
import imgJobNotFound from "../../assets/images/nofound.jpg";
import { jobApi } from "../../utils/api/jobApi";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobNotFound, setJobNotFound] = useState(false);
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const getJobs = async () => {
      const rs = await jobApi.getJobs();
      setJobs(rs);
      dispatch(setJobsResult(pathname === "/" ? [] : rs));
    };
    getJobs();
  }, []);

  const { jobsResult } = useSelector((state) => state.job);

  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState({
    salary: "",
    scale: "",
    wotkingForm: "",
    time: "",
  });

  const handleSearch = () => {
    setJobNotFound(false);
    let jobFiltered = [...jobs];
    const search = JSON.parse(localStorage.getItem("search")) || [];
    {
      searchQuery.trim() && search.push(searchQuery);
    }
    localStorage.setItem("search", JSON.stringify(search));

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      jobFiltered = jobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(query) ||
          job.jobSkills.toLowerCase().includes(query) ||
          job?.company?.name.toLowerCase().includes(query) ||
          job.jobDescription.toLowerCase().includes(query)
      );
    }

    const { salary, scale, wotkingForm, time } = dataFilter;

    if (salary !== "") {
      jobFiltered = jobFiltered.filter((job) => job.salary === salary);
    }

    if (scale !== "") {
      jobFiltered = jobFiltered.filter((job) => job.scale === scale);
    }

    if (wotkingForm !== "" && wotkingForm !== "Cả hai") {
      jobFiltered = jobFiltered.filter(
        (job) => job.wotkingForm === wotkingForm
      );
    }

    if (time !== "") {
      jobFiltered = jobFiltered.filter((job) => job.time === time);
    }

    dispatch(setJobsResult(jobFiltered));
    dispatch(setJobSelected(jobFiltered[0]));
    navigate(`/${jobFiltered[0]._id}`);

    if (!jobFiltered.length) {
      setJobNotFound(true);
    }
  };

  return (
    <Box>
      <Filter
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dataFilter={dataFilter}
        setDataFilter={setDataFilter}
      />
      {jobsResult?.length ? (
        <FilterData jobs={jobsResult} />
      ) : jobNotFound ? (
        <Box
          sx={{
            height: "80vh",
            background: "#ddd",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              height: "90%",
              margin: 5,
              borderRadius: 5,
            }}
          >
            <img
              src={imgJobNotFound}
              alt="job not found"
              style={{ width: "auto", height: "400px", objectFit: "cover" }}
            />
            <Typography textAlign={"center"} fontWeight={600} fontSize={25}>
              Xin lỗi! Việc làm bạn đang tìm kiếm không tồn tại.
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ background: "white", width: "100%", padding: 5 }}>
          <Typography
            sx={{
              textAlign: "center",
              color: "black",
              fontWeight: 600,
              fontSize: 30,
            }}
          >
            Công cụ tốt nhất cho hành trang ứng tuyển của bạn
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "space-around",
              pt: 10,
            }}
          >
            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={image1}
                alt="im2"
                style={{ height: 300, width: "auto", objectFit: "cover" }}
              />
              <Typography sx={{ fontSize: 20, pt: 5, textAlign: "center" }}>
                Danh sách việc làm &quot;chất&quot; liên tục cập nhật các lựa
                chọn mới nhất theo thị trường và xu hướng tìm kiếm.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={image2}
                alt="im2"
                style={{ height: 300, width: "auto", objectFit: "cover" }}
              />
              <Typography sx={{ fontSize: 20, pt: 5, textAlign: "center" }}>
                Kiến tạo hồ sơ với bố cục chuẩn mực, chuyên nghiệp dành riêng
                cho ngành IT, được nhiều nhà tuyển dụng đề xuất.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={image3}
                alt="im2"
                style={{ height: 300, width: "auto", objectFit: "cover" }}
              />
              <Typography sx={{ fontSize: 20, pt: 5, textAlign: "center" }}>
                Đừng bỏ lỡ cơ hội cập nhật thông tin lương thưởng, chế độ làm
                việc, nghề nghiệp và kiến thức ngành IT.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <ApplyModal />
      <NotificationModal />
    </Box>
  );
};

export default Home;
