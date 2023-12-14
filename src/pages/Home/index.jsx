import { useState } from "react";
import Filter from "../../components/home/Filter";
import { Box, Typography } from "@mui/material";
import FilterData from "../../components/home/FilterData";
import ApplyModal from "../../components/ApplyModal";
import NotificationModal from "../../components/NotificationModal";
import { useGetJobsQuery } from "../../api/admin/adminApi";

const Home = () => {
  const { data } = useGetJobsQuery();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery) {
      setJobs(
        data.filter((job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setJobs(data);
    }
  };

  return (
    <Box>
      <Filter handleSearch={handleSearch} />
      {jobs.length ? (
        <FilterData />
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
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBKIWAjDsCobecM0lfPBVsgQinMCxRkx2TFTqotbwYdCUzUAHw8KKjWalvLPzIIHkXMdI&usqp=CAU"
                }
                alt="im2"
                style={{ height: 300, width: "auto", objectFit: "cover" }}
              />
              <Typography sx={{ fontSize: 20, pt: 5, textAlign: "center" }}>
                Danh sách việc làm "chất" liên tục cập nhật các lựa chọn mới
                nhất theo thị trường và xu hướng tìm kiếm.
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBKIWAjDsCobecM0lfPBVsgQinMCxRkx2TFTqotbwYdCUzUAHw8KKjWalvLPzIIHkXMdI&usqp=CAU"
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBKIWAjDsCobecM0lfPBVsgQinMCxRkx2TFTqotbwYdCUzUAHw8KKjWalvLPzIIHkXMdI&usqp=CAU"
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
