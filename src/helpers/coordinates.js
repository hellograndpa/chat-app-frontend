export const getCoords = async () => {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return position;
};

export const getDistance = (from, to) => {
  const { latitude: lat1, longitude: lon1 } = from;
  const { latitude: lat2, longitude: lon2 } = to;

  const R = 6371000; // m
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const dlat1 = (lat1 * Math.PI) / 180;
  const dlat2 = (lat2 * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(dlat1) * Math.cos(dlat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return (d * Math.PI) / 180;
};

export const getDistanceFromMe = async to => {
  const { coords } = await getCoords();

  return getDistance(coords, to);
};
