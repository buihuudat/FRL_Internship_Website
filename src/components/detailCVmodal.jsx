import { Box, Button, Chip, Divider, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setViewDetailCV } from "../slice/jobSlice";
import moment from "moment";
import { address } from "../actions/userAddress";
import { notificationApi } from "../utils/api/notificationApi";
import { jobApi } from "../utils/api/jobApi";

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

const DetailCVmodal = () => {
  const { open, data } = useSelector((state) => state.job.viewDetailCV);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setViewDetailCV({ show: false }));
  };

  const { companyAuthor } = useSelector((state) => state.company);

  const onCheck = async (status) => {
    const dataNoti = {
      userId: data?.user?._id,
      companyName: companyAuthor?.name,
      jobTitle: data?.job?.jobTitle,
      status,
    };
    await notificationApi.updateNotification(dataNoti);
    await jobApi.updateStatusCV(data._id, { status });
    handleClose();
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        <Box sx={{ position: "relative" }}>
          {data?.status ? (
            <Typography
              align="center"
              fontSize={20}
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                color: data.status === "appropriate" ? "green" : "red",
              }}
            >
              {data.status}
            </Typography>
          ) : null}
          <Typography align="center" fontSize={20}>
            {data?.job?.jobTitle}
          </Typography>

          <Box p={3}>
            <Typography>
              Tên ứng viên:{" "}
              <b>
                <i> {data?.user?.name}</i>
              </b>
            </Typography>
            <Typography>
              Số điện thoại:
              <b>
                <i> {data?.user?.phone}</i>
              </b>
            </Typography>
            <Typography>
              Email:{" "}
              <b>
                <i> {data?.user?.email}</i>
              </b>
            </Typography>
            <Typography>
              Địa chỉ:{" "}
              <b>
                <i> {address(data?.user?.address)}</i>
              </b>
            </Typography>
          </Box>
          <Divider>
            <Chip label="Nội dung ứng tuyển" size="small" />
          </Divider>
          <Box sx={{ maxHeight: 500, overflow: "auto" }}>
            <Typography>{data?.textMore}</Typography>
          </Box>

          <Divider />
          <Typography>
            Ngày ứng tuyển:{" "}
            <b>
              <i> {moment(data?.createdAt).format("lll")}</i>
            </b>
          </Typography>
          <Typography>
            CV:{" "}
            <a
              style={{
                backgroundColor: "rgba(255,255,255",
                cursor: "pointer",
              }}
              href={data?.file?.file}
              download={data?.file?.newName || data?.file?.name}
            >
              {data?.file?.name}
            </a>
          </Typography>
        </Box>

        {data?.status ? null : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              mt: 3,
            }}
          >
            <Button
              variant="text"
              color="warning"
              fullWidth
              onClick={() => onCheck("inappropriate")}
            >
              Chưa phù hợp
            </Button>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => onCheck("appropriate")}
            >
              Phù hợp
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default DetailCVmodal;
