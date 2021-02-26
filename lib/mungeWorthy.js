function keyLocation(locationInfo){
  return {
    formatted_query: locationInfo[0].display_name,
    latitude: locationInfo[0].lat,
    longitude: locationInfo[0].lon,
  };
}
function keyWeatherCast(weatherInfo){
  const usefulWeather = weatherInfo.data.map(infoItem => {
    return {
      forecast: infoItem.weather.description,
      time : new Date(infoItem.ts * 1000).toDateString(),
    };
  });
  const finalWeather = usefulWeather.slice(0, 7);
  return finalWeather;
}
function keyReview(ReviewInfo){
  const finalReview = ReviewInfo.data.map(review => {
    return {
      name: review.name,
      image_url: review.image_url,
      price: review.price,
      rating: review.rating,
      url: review.url,
    };

  });
  
  return finalReview;
}
module.exports = {
  keyLocation,
  keyWeatherCast,
  keyReview
};
