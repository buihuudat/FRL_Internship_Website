import haversine from "haversine-distance";

export const getDistance = ([a, b], [c, d]) => {
  const rs = Math.round(haversine([a, b], [c, d]));

  if (!rs) return null;
  if (rs < 1000) return rs.toString().replace(".", ",") + " m";
  return (rs / 1000).toString().replace(".", ",") + " km";
};
