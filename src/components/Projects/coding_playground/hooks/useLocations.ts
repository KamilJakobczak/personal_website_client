export const useLocations = (location: string) => {
  const locationString = location.substring(6);

  if (locationString.indexOf('/') > 0) {
    const slashIndex = locationString.indexOf('/');
    return locationString.slice(0, slashIndex);
  }

  return locationString;
};
