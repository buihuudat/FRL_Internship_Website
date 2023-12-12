import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { notificationModal, showModal } from "../slice/jobSlice";
import { FormControlLabel, Radio, TextField } from "@mui/material";
import FileBase64 from "react-file-base64";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  minWidth: 500,
  borderRadius: 5,
};

const ApplyModal = () => {
  const dispatch = useDispatch();
  const [textMore, setTextMore] = React.useState("");

  const open = useSelector((state) => state.job.modal.show);

  const handleClose = () => {
    dispatch(showModal({ show: false, data: null }));
  };

  const onGetFileDone = (e) => {
    console.log(e);
  };

  const handleApply = () => {
    handleClose();
    dispatch(notificationModal({ show: true }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography fontWeight={600} fontSize={25}>
              Tên công ty
            </Typography>
            <TextField label={"Tên"} required fullWidth />
            <Typography fontWeight={600} fontSize={25}>
              CV Ứng tuyển
            </Typography>
            <Box sx={{ border: "2px solid #ddd", padding: 1, borderRadius: 2 }}>
              <FormControlLabel
                value="Sử dụng CS đã UpLoad"
                control={<Radio disabled />}
                label="Sử dụng CS đã UpLoad"
              />
              <Typography color={"error"} sx={{ ml: 4 }}>
                Tên cv.pdf
              </Typography>
            </Box>

            <Box sx={{ border: "2px solid #ddd", padding: 1, borderRadius: 2 }}>
              <FormControlLabel
                value="Tải lên CV mới"
                control={<Radio disabled />}
                label="Tải lên CV mới"
              />
              <FileBase64 multiple={true} onDone={onGetFileDone} />
              <Typography sx={{ ml: 4, color: "#999", fontSize: 12 }}>
                Hỗ trợ định dạng .doc .pdf, không chứa mật khẩu bảo vệ, dung
                lượng dưới 3mb.
              </Typography>
            </Box>

            <Typography fontSize={25} fontWeight={600}>
              Thư xin thực tập{" "}
              <span style={{ fontWeight: 300, color: "#999" }}>
                (Không bắt buộc)
              </span>
            </Typography>

            <Typography>
              Những kỹ năng, dự án hay thành tựu nào chứng tỏ bạn là một ứng
              viên tiềm năng cho vị trí ứng tuyển này?
            </Typography>

            <TextField
              onChange={(e) => setTextMore(e.target.value)}
              multiline
              rows={3}
              placeholder="Nêu nhiều vị trí cụ thể để làm hồ sơ ứng tuyển của bạn thuyết phục hơn..."
            />
            <Typography color={"#999"}>
              Còn lại {500 - textMore.length} trong tổng 500 kí tự
            </Typography>
          </Box>

          <Button
            sx={{ fontWeight: 600, mt: 3 }}
            variant="contained"
            color="error"
            fullWidth
            onClick={handleApply}
          >
            Gửi CV của tôi
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ApplyModal;
