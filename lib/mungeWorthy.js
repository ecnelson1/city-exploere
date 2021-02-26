function keyLocation(locationInfo){
  return {
    formatted_query: locationInfo[0].display_name,
    latitude: locationInfo[0].lat,
    longitude: locationInfo[0].lon,
  };
}
module.exports = {
  keyLocation
};
