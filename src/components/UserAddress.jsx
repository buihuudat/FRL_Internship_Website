import {
  Box,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getDistricts, getProvinces, getWards } from "../utils/getProvince";

const UserAddress = ({ user, setUser }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data.results);
    });
    if (address?.province_id) {
      getDistricts(address.province_id).then((districtData) => {
        setDistricts(districtData.results);
      });
    }
    if (address?.district_id) {
      getWards(address.district_id).then((wardData) => {
        setWards(wardData.results);
      });
    }
  }, [address]);

  useEffect(() => {
    if (user?.address && address) {
      const province = provinces.find(
        (p) => p.province_id === address.province_id
      )?.province_name;
      const district = districts.find(
        (d) => d.district_id === address.district_id
      )?.district_name;

      setUser((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          province: province || prev.address.province,
          district: district || prev.address.district,
        },
      }));
    }
  }, [address, provinces, districts, wards]);

  return provinces?.length ? (
    <Box
      sx={{
        display: "flex",
        paddingY: 2,
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      <FormControl sx={{ width: "45%" }}>
        <InputLabel>Province</InputLabel>
        <Select
          defaultValue={user?.address?.province}
          label="Province"
          onChange={(e) => {
            setAddress((prev) => ({
              ...prev,
              province_id: e.target.value,
            }));
          }}
        >
          {provinces.map((province) => (
            <MenuItem key={province?.province_id} value={province?.province_id}>
              {province?.province_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "45%" }}>
        <InputLabel>District</InputLabel>
        <Select
          defaultValue={user?.address?.district}
          label="District"
          onChange={(e) => {
            setAddress((prev) => ({
              ...prev,
              district_id: e.target.value,
            }));
          }}
        >
          {districts.map((district) => (
            <MenuItem key={district?.district_id} value={district?.district_id}>
              {district?.district_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "45%" }}>
        <InputLabel>Ward</InputLabel>
        <Select
          defaultValue={user?.address?.ward}
          label="Ward"
          onChange={(e) => {
            setUser((prev) => ({
              ...prev,
              address: {
                ...prev.address,
                ward: e.target.value,
              },
            }));
          }}
        >
          {wards.map((ward) => (
            <MenuItem key={ward?.ward_id} value={ward?.ward_name}>
              {ward?.ward_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Street"
        name="street"
        sx={{ width: "45%" }}
        defaultValue={user?.address?.street}
        onChange={(e) =>
          setUser((prev) => ({
            ...user,
            address: {
              ...prev.address,
              street: e.target.value,
            },
          }))
        }
      />
    </Box>
  ) : (
    <LinearProgress />
  );
};

export default UserAddress;
