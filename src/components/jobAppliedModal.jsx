import { Box, Modal, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedModal } from "../slice/jobSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        {data?.map((d, i) => (
          <Box key={i} sx={{ display: "flex", flexDirection: "column" }}>
            <Paper
              elevation={9}
              sx={{ p: 3, display: "flex", flexDirection: "column" }}
            >
              <b>Nội dung thư ứng tuyển: </b> {d?.textMore}
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
            </Paper>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default JobAppliedModal;
