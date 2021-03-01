require('dotenv').config();

const { keyLocation, keyWeatherCast, keyReview } = require('../lib/mungeWorthy.js');


test('returns properly formatted location from raw data', async() => {

  const expectation = {
    formatted_query: 'Seattle, King County, Washington, USA',
    latitude: '47.6038321',
    longitude: '-122.3300624'
  };
  const locationInfo = [
    {
      place_id: '235549103',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'relation',
      osm_id: '237385',
      boundingbox: [
        47.4810022,
        47.7341357,
        -122.459696,
        -122.224433
      ],
      lat: '47.6038321',
      lon: '-122.3300624',
      display_name: 'Seattle, King County, Washington, USA',
      class: 'place',
      type: 'city',
      importance: 0.772979173564379,
      icon: 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
    },
    {
      place_id: '55417079',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'node',
      osm_id: '4836954932',
      boundingbox: [
        20.7199184,
        20.7200184,
        -103.3763786,
        -103.3762786
      ],
      lat: '20.7199684',
      lon: '-103.3763286',
      display_name: 'Seattle, Villas de Guadalupe, Zapopan, Jalisco, 38901, Mexico',
      class: 'place',
      type: 'neighbourhood',
      importance: 0.30000000000000004
    },
    {
      place_id: '156976950',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '291707810',
      boundingbox: [
        25.1837689,
        25.1845505,
        121.4465868,
        121.4474398
      ],
      lat: '25.18415975',
      lon: '121.446939985985',
      display_name: 'Seattle, Lanweibu, Beitou Village, Danhai, Tamsui District, New Taipei, Taiwan',
      class: 'landuse',
      type: 'residential',
      importance: 0.30000000000000004
    },
    {
      place_id: '84138175',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '10671266',
      boundingbox: [
        41.9611659,
        41.9657274,
        -121.9226362,
        -121.9226043
      ],
      lat: '41.9641881',
      lon: '-121.922629',
      display_name: 'Seattle, Dorris, Siskiyou County, California, 96058, USA',
      class: 'highway',
      type: 'residential',
      importance: 0.2
    },
    {
      place_id: '90129562',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '22919051',
      boundingbox: [
        14.6180684,
        14.6213139,
        121.0429669,
        121.0448923
      ],
      lat: '14.6195488',
      lon: '121.0440164',
      display_name: 'Seattle, Kaunlaran, Cubao, 4th District, Quezon City, Second District, Metro Manila, 1111, Philippines',
      class: 'highway',
      type: 'residential',
      importance: 0.2
    },
    {
      place_id: '160325077',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '307770120',
      boundingbox: [
        28.8472264,
        28.8487875,
        -111.9789493,
        -111.9780146
      ],
      lat: '28.8481394',
      lon: '-111.9783605',
      display_name: 'Seattle, Nuevo Kino, Bahía Kino, Hermosillo, Sonora, Mexico',
      class: 'highway',
      type: 'residential',
      importance: 0.2
    },
    {
      place_id: '203034631',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '561843639',
      boundingbox: [
        47.4112544,
        47.4112745,
        -122.2621269,
        -122.2608738
      ],
      lat: '47.4112602',
      lon: '-122.260923',
      display_name: 'Seattle, Kent, King County, Washington, 98032, USA',
      class: 'highway',
      type: 'service',
      importance: 0.175
    },
    {
      place_id: '312432415',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '165271257',
      boundingbox: [
        14.6696649,
        14.6703081,
        121.0988688,
        121.0994135
      ],
      lat: '14.6703081',
      lon: '121.0994135',
      display_name: 'Seattle, Vista Real Classica, Batasan Hills, 2nd District, Quezon City, Second District, Metro Manila, Philippines',
      class: 'highway',
      type: 'service',
      importance: 0.175
    },
    {
      place_id: '6534059',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'node',
      osm_id: '668442224',
      boundingbox: [
        47.6028456,
        47.6029456,
        -122.3398908,
        -122.3397908
      ],
      lat: '47.6028956',
      lon: '-122.3398408',
      display_name: 'Seattle, Colman Dock, West Edge, Belltown, Seattle, King County, Washington, 98104, USA',
      class: 'amenity',
      type: 'ferry_terminal',
      importance: 0.101
    },
    {
      place_id: '291835496',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'node',
      osm_id: '6316610385',
      boundingbox: [
        50.8122486,
        50.8123486,
        -0.1020589,
        -0.1019589
      ],
      lat: '50.8122986',
      lon: '-0.1020089',
      display_name: 'The Seattle, The Strand, Brighton Marina, Brighton, Brighton and Hove, South East, England, BN2 5UW, United Kingdom',
      class: 'tourism',
      type: 'hotel',
      importance: 0.101,
      icon: 'https://locationiq.org/static/images/mapicons/accommodation_hotel2.p.20.png'
    }];
       

  const actual = keyLocation(locationInfo);

  expect(actual).toEqual(expectation);
});
 
test('returns properly formatted weather information from raw data', async() => {

  const expectation = [{
    forecast: 'Scattered clouds', 
    time: 'Fri Feb 26 2021'
  }];
  const weatherInfo = {data: [
    {
      moonrise_ts: 1614383594,
      wind_cdir: 'SW',
      rh: 83,
      pres: 1008.85,
      high_temp: 9.1,
      sunset_ts: 1614390684,
      ozone: 411.308,
      moon_phase: 0.996837,
      wind_gust_spd: 10.0938,
      snow_depth: 0,
      clouds: 33,
      ts: 1614326460,
      sunrise_ts: 1614351294,
      app_min_temp: -0.1,
      wind_spd: 1.85835,
      pop: 55,
      wind_cdir_full: 'southwest',
      slp: 1013.62,
      moon_phase_lunation: 0.51,
      valid_date: '2021-02-26',
      app_max_temp: 9.1,
      vis: 24.096,
      dewpt: 3.6,
      snow: 0,
      uv: 1.37107,
      weather: {
        icon: 'c02d',
        code: 802,
        description: 'Scattered clouds'
      },
      wind_dir: 229,
      max_dhi: null,
      clouds_hi: 0,
      precip: 1.125,
      low_temp: 3.1,
      max_temp: 9.1,
      moonset_ts: 1614353683,
      datetime: '2021-02-26',
      temp: 6.6,
      min_temp: 3.8,
      clouds_mid: 7,
      clouds_low: 32
    },
    
  ] };

  const actual = keyWeatherCast(weatherInfo);

  expect(actual).toEqual(expectation);
});

test('returns properly formatted review information from raw data', async() => {

  const expectation = [
    {
      name: 'Pike Place Chowder',
      image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/ijju-wYoRAxWjHPTCxyQGQ/o.jpg',
      price: '$$   ',
      rating: '4.5',
      url: 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
    },
    {
      name: 'Umi Sake House',
      image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/c-XwgpadB530bjPUAL7oFw/o.jpg',
      price: '$$   ',
      rating: '4.0',
      url: 'https://www.yelp.com/biz/umi-sake-house-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
    }];

  const reviews = { businesses : [
    {
      image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/ijju-wYoRAxWjHPTCxyQGQ/o.jpg',
      facts: 'big ones',
      name: 'Pike Place Chowder',
      price: '$$   ',
      rating: '4.5',
      url: 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA',
    },
    {
      image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/c-XwgpadB530bjPUAL7oFw/o.jpg',
      facts: 'lil ones',
      name: 'Umi Sake House',
      price: '$$   ',
      rating: '4.0',
      url: 'https://www.yelp.com/biz/umi-sake-house-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA',
    }] };

  const actual = keyReview(reviews);

  expect(actual).toEqual(expectation);
});
