import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { data } from "../../sources/data";
import { useSelector } from "react-redux";
import { getCurrentAddress } from "../../actions/getCurrentAddress";
import { userApi } from "../../utils/api/userApi";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { address } from "../../actions/userAddress";
import aiImg from "../../assets/images/__.gif";
import { useNavigate } from "react-router-dom";

const SelectActions = ({
  name,
  data = [],
  keyName,
  dataFilter,
  setDataFilter,
}) => {
  return (
    <FormControl
      sx={{
        background: "white",
        width: "32%",
        borderRadius: 2,
      }}
    >
      <InputLabel
        style={{
          color: "red",
          borderColor: "red",
          outline: "red",
          fontWeight: "bold",
        }}
      >
        {name}
      </InputLabel>
      <Select
        value={dataFilter[keyName]}
        label={name}
        onChange={(e) =>
          setDataFilter((prev) => ({
            ...prev,
            [keyName]: e.target.value,
          }))
        }
      >
        {data.map((v, i) => (
          <MenuItem value={v.value} key={i}>
            {v.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Filter = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
  dataFilter,
  setDataFilter,
}) => {
  const searchHistory = JSON.parse(localStorage.getItem("search")) ?? [];
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleGetCurrentAddress = () => {
    if (!user) return;
    getCurrentAddress().then(async (data) => {
      const address = {
        province: data?.address?.features[0]?.properties?.city,
        district: data?.address?.features[0]?.properties?.suburb,
        ward: data?.address?.features[0]?.properties?.road,
        lat: data.lat,
        lng: data.lng,
      };

      const confirmed = window.confirm("Bạn có muốn cập nhật địa chỉ mới?");

      if (confirmed) {
        try {
          await toast.promise(userApi.updateAddress(address), {
            loading: "Đang cập nhật",
            success: "Cập nhật thành công",
            error: "Cập nhật thất bại",
          });
          window.location.reload();
        } catch (error) {
          console.log(error);
          toast.error("Cập nhật thất bại");
        }
      }
    });
  };

  return (
    <Box
      sx={{
        p: 1,
        pt: 0,
        px: 10,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      <Box sx={{ width: 120 }}></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Button
          fullWidth
          sx={{
            p: 1,
            gap: 1,
            height: "max-content",
            ":hover": {
              background: "#555",
            },
          }}
          variant="text"
          onClick={handleGetCurrentAddress}
        >
          <LocationOnIcon sx={{ color: "white", fontSize: "16" }} />
          {user?.address ? (
            <Typography color={"white"} fontWeight={600} fontSize={16}>
              {address(user.address)}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              animation="pulse"
              sx={{ fontSize: "1rem", width: 400, backgroundColor: "gray" }}
            />
          )}
        </Button>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 2,
            position: "relative",
          }}
        >
          <TextField
            placeholder="Nhập từ khóa kỹ năng, công ty,..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            fullWidth
          />
          <Button
            style={{
              background: `url(${aiImg}) center center no-repeat`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              position: "absolute",
              right: 10,
              top: -4,
              padding: "5px 10px",
              transform: "translateY(50%)",
              borderRadius: "20px",
              zIndex: 10,
              border: "none",
              color: "white",
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => navigate("/search")}
          >
            Sử dụng AI
          </Button>
          {searchHistory?.length && searchQuery !== "" ? (
            <Box
              sx={{
                position: "absolute",
                top: 50,
                background: "white",
                width: "100%",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                padding: 1,
                zIndex: 10,
                border: "1px solid gray",
                display: "flex",
                flexDirection: "row",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {searchHistory?.slice(0, 10).map((search, i) => (
                <Typography
                  key={i}
                  sx={{
                    paddingX: 1,
                    border: "1px solid gray",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  color={"#555"}
                  fontSize={12}
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Typography>
              ))}
            </Box>
          ) : null}
        </Box>
        <SelectActions
          name="Mức lương"
          keyName="salary"
          data={data.salary}
          dataFilter={dataFilter}
          setDataFilter={setDataFilter}
        />
        {/* {user ? (
          <SelectActions
            name="Khoảng cách"
            data={data.scale}
            dataFilter={dataFilter}
            setDataFilter={setDataFilter}
            keyName={"scale"}
          />
        ) : null} */}
        <SelectActions
          name="Hình thức làm việc"
          data={data.workForm}
          dataFilter={dataFilter}
          setDataFilter={setDataFilter}
          keyName={"wotkingForm"}
        />
        <SelectActions
          name="Thời gian"
          data={data.time}
          dataFilter={dataFilter}
          setDataFilter={setDataFilter}
          keyName={"time"}
        />
      </Box>
      <Button
        sx={{
          display: "flex",
          background: "red",
          height: "max-content",
          borderRadius: 5,
          gap: 1,
          padding: "5px 15px",
          mt: "auto",
          alignItems: "center",
          ":hover": {
            background: "red",
          },
        }}
        onClick={handleSearch}
      >
        <Typography color={"white"} fontWeight={600} fontSize={20}>
          Tìm kiếm
        </Typography>
        <FaSearch size={20} color="white" />
      </Button>
    </Box>
  );
};

export default Filter;
