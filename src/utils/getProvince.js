import axios from "axios";
const host = "https://vapi.vnappmob.com";

export const getProvinces = async () => {
  // const res = await axios.get(`${host}/api/province`);
  fetch(`${host}/api/province`)
    .then((res) => res.json())
    .then((res) => console.log(res.data));
  // console.log(res);
  // if (res && res.data) return res.data;
  return [];
};

export const getDistricts = async (id) => {
  const res = await axios.get(`${host}/api/province/district/${id}`);
  if (res && res.data) return res.data;
  return [];
};

export const getWards = async (id) => {
  const res = await axios.get(`${host}/api/province/ward/${id}`);
  if (res && res.data) return res.data;
  return [];
};
