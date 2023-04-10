export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};


// export const getCurrentPosition = () =>
//   new Promise<GeolocationPosition>((resolve, reject) =>
//     resolve({
//       coords: {
//         latitude: 52.520008,
//         longitude: 13.404954,
//         accuracy: 0,
//         altitude: null,
//         altitudeAccuracy: null,
//         heading: null,
//         speed: null,
//       },
//       timestamp: Date.now(),
//     })
//   );
