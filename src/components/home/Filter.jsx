import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { data } from "../../sources/data";

const SelectActions = ({
  name,
  data = [],
  keyName,
  dataFilter,
  setDataFilter,
}) => {
  return (
    <FormControl sx={{ background: "white", width: "30%", borderRadius: 2 }}>
      <InputLabel>{name}</InputLabel>
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
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      <Button
        sx={{
          background: "white",
          p: 1,
          gap: 3,
          width: 200,
          height: "max-content",
          borderRadius: 5,
          ":hover": {
            background: "white",
          },
        }}
      >
        <LocationOnIcon sx={{ color: "black", fontSize: "16" }} />
        <Typography color={"black"} fontWeight={600} fontSize={25}>
          ABC
        </Typography>
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          flex: 1,
        }}
      >
        <TextField
          placeholder="Nhập từ khóa kỹ năng, công ty,..."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          sx={{ width: "63%", backgroundColor: "white", borderRadius: 2 }}
        />
        <SelectActions
          name="Mức lương"
          keyName="salary"
          data={data.salary}
          dataFilter={dataFilter}
          setDataFilter={setDataFilter}
        />
        <SelectActions
          name="Khoảng cách"
          data={data.scale}
          dataFilter={dataFilter}
          setDataFilter={setDataFilter}
          keyName={"scale"}
        />
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
          padding: 1,
          mt: "auto",
          alignItems: "center",
          ":hover": {
            background: "red",
          },
        }}
        onClick={handleSearch}
      >
        <LocationOnIcon sx={{ color: "white" }} />
        <Typography color={"white"} fontWeight={600} fontSize={20}>
          Tìm kiếm
        </Typography>
      </Button>
    </Box>
  );
};

export default Filter;
