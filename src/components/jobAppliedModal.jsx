import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedModal, setViewDetailCV } from "../slice/jobSlice";
import moment from "moment";
import { jobApi } from "../utils/api/jobApi";
import { notificationApi } from "../utils/api/notificationApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  maxHeight: 500,
  overflow: "auto",
  borderRadius: 5,
};
const JobAppliedModal = () => {
  const { open, data } = useSelector((state) => state.job.appliedModal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setAppliedModal({ show: false }));
  };
  const { companyAuthor } = useSelector((state) => state.company);

  const handleViewDetail = async (data) => {
    const dataNoti = {
      userId: data?.user?._id,
      companyName: companyAuthor?.name,
      jobTitle: data?.job?.jobTitle,
      viewed: true,
    };
    try {
      if (!data?.viewed) {
        await notificationApi.updateNotification(dataNoti);
      }
      await jobApi.updateViewCV(data._id);
      dispatch(setViewDetailCV({ open: true, data }));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        <Typography textAlign={"center"}>
          Có tổng cộng {data?.length} CV đã ứng tuyển
        </Typography>
        {data?.map((d, i) => (
          <Box key={i} sx={{ display: "flex", flexDirection: "column" }}>
            <Paper
              elevation={9}
              sx={{ p: 3, display: "flex", flexDirection: "column" }}
            >
              <Typography>
                Ngày ứng tuyển: {moment(d.createdAt).format("lll")}
              </Typography>
              <a
                style={{
                  backgroundColor: "rgba(255,255,255",
                  cursor: "pointer",
                }}
                href={d?.file?.file}
                download={d?.file?.newName || d?.file?.name}
              >
                {d?.file?.name}
              </a>
              <Button sx={{ mt: 2 }} onClick={() => handleViewDetail(d)}>
                Xem chi tiết
              </Button>
            </Paper>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default JobAppliedModal;
