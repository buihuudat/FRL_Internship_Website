import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../slice/companySlice";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import FileBase64 from "react-file-base64";
import toast from "react-hot-toast";
import {
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompanyJobsQuery,
  useUpdateCompanyMutation,
} from "../api/admin/adminApi";
import JobItem from "./JobItem";

const CompanyModal = () => {
  const dataUpdate = useSelector((state) => state.company.modal.data);
  const open = useSelector((state) => state.company.modal.show);
  const { data } = useGetCompanyJobsQuery({ id: dataUpdate?._id });

  const [value, setValue] = useState(
    dataUpdate?.ot === "Cần tăng ca" ? 0 : 1 || 0
  );
  const [image, setImage] = useState(dataUpdate?.image || undefined);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModal({ show: false, data: null }));
  };
  const [deleteCompany] = useDeleteCompanyMutation();
  const handleDelete = async () => {
    await toast.promise(deleteCompany(dataUpdate?._id), {
      loading: "Đang xóa...",
      success: "Xóa thành công",
      error: "Xóa thất bại",
    });
  };

  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "max-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    display: "flex",
    gap: 5,
    justifyContent: "space-between",
    flexWrap: "wrap",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      image,
      name: formData.get("name"),
      address: formData.get("address"),
      country: formData.get("country"),
      website: formData.get("website"),
      social: formData.get("facebook"),
      description: formData.get("description"),
      scale: formData.get("scale"),
      ot: value ? "Có tăng ca" : "Không tăng ca",
    };

    toast
      .promise(
        dataUpdate
          ? updateCompany({ id: dataUpdate._id, company: data })
          : createCompany(data),
        {
          loading: dataUpdate ? "Đang lưu..." : "Đang tạo ...",
          success: dataUpdate ? "Lưu thành công" : "Tạo thành công",
          error: dataUpdate ? "Lưu thất bại" : "Tạo thất bại",
        }
      )
      .then(() => handleClose());
  };
  const handleDone = (e) => {
    if (!e.type.includes("image")) return toast.error("Ảnh không hợp lệ");
    setImage(e.base64);
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
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              overflow: "auto",
              maxHeight: "100%",
            }}
          >
            <Typography fontWeight={600} fontSize={25} align="center">
              {dataUpdate ? "Chỉnh sửa thông tin" : "Thêm công ty mới"}
            </Typography>

            <Box>
              {image && image !== "" && (
                <img
                  src={image}
                  alt="img-company"
                  style={{ margin: "0 auto", display: "flex", width: 200 }}
                />
              )}
              <FileBase64 onDone={handleDone} />
            </Box>

            <TextField
              label="Tên công ty"
              name="name"
              fullWidth
              required
              defaultValue={dataUpdate?.name}
            />
            <TextField
              label="Địa chỉ"
              name="address"
              fullWidth
              required
              defaultValue={dataUpdate?.address}
            />
            <TextField
              label="Giới thiệu công ty"
              name="description"
              defaultValue={dataUpdate?.description}
              multiline
              required
              rows={3}
              fullWidth
            />
            <Box display={"flex"} gap={3}>
              <TextField
                label="Quy mô"
                name="scale"
                required
                defaultValue={dataUpdate?.scale}
              />
              <TextField
                label="Quốc gia"
                name="country"
                required
                defaultValue={dataUpdate?.country}
              />
              <TextField
                label="Website"
                name="website"
                required
                defaultValue={dataUpdate?.website}
              />
              <TextField
                label="Facebook"
                name="facebook"
                required
                defaultValue={dataUpdate?.social}
              />
            </Box>

            <FormControl>
              <FormLabel>Tăng ca</FormLabel>
              <RadioGroup
                value={value}
                onChange={(e) => setValue(+e.target.value)}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Không tăng ca"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Có tăng ca"
                />
              </RadioGroup>
            </FormControl>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
            >
              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                color="error"
                fullWidth
              >
                Hủy
              </Button>
              {dataUpdate && (
                <Button
                  variant="outlined"
                  onClick={handleDelete}
                  color="error"
                  fullWidth
                  disabled={data?.length}
                >
                  {data?.length > 0 ? (
                    <i>
                      <b>Cần Xóa hết Công việc trước khi xóa công ty</b>
                    </i>
                  ) : (
                    "Delete"
                  )}
                </Button>
              )}
            </Box>
          </Box>

          {dataUpdate?._id && (
            <Box>
              {data?.length > 0 &&
                data?.map((job) => <JobItem key={job._id} {...job} />)}
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CompanyModal;
