export const getCoords = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const newPosition = { coords: { latitude: position.coords.longitude, longitude: position.coords.latitude } };

    return newPosition;
  } catch (error) {
    console.log(error);
  }
};

export const getDistance = (from, to) => {
  const { latitude: lat1, longitude: lon1 } = from;
  const { latitude: lat2, longitude: lon2 } = to;

  // const R = 6371; // m
  // const dLat = ((lat2 - lat1) * Math.PI) / 180;
  // const dLon = ((lon2 - lon1) * Math.PI) / 180;
  // const dlat1 = (lat1 * Math.PI) / 180;
  // const dlat2 = (lat2 * Math.PI) / 180;

  // const a =
  //   Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //   Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(dlat1) * Math.cos(dlat2);
  // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // const d = R * c;

  // return (d * Math.PI) / 180;

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
