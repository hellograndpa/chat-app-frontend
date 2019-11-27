export const getCoords = async () => {
  try {
    let newPosition = { coords: { latitude: 0, longitude: 0 } };

    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      newPosition = { coords: { latitude: position.coords.longitude, longitude: position.coords.latitude } };
    } else {
      window.geo_position_js.init();

      const position = await new Promise((resolve, reject) => {
        window.geo_position_js.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
      });

      newPosition = { coords: { latitude: position.coords.longitude, longitude: position.coords.latitude } };
    }

    return newPosition;
  } catch (error) {
    return { coords: { latitude: 0, longitude: 0 } };
  }
};

export const getDistance = (from, to) => {
  const { latitude: lat1, longitude: lon1 } = from;
  const { latitude: lat2, longitude: lon2 } = to;

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist *= 1.609344;

  return dist;
};

export const getDistanceFromMe = async to => {
  const { coords } = await getCoords();

  return getDistance(coords, to);
};
