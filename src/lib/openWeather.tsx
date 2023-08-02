import { DateTime } from 'luxon';

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const getWeatherData = (infoType: any, searchParams: any) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: API_KEY,
  }).toString();
  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data: any) => {
  console.log(data);

  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed, deg },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
    deg,
  };
};

const formatForecastWeather = (data: any) => {
  let { list } = data;
  let { timezone } = data.city;

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const list_daily = list
    ?.filter((_: any, index: any) => index % 8 === 0)
    .map((d: any) => {
      return {
        title: formatToLocalTime(d.dt, userTimezone, 'ccc'),
        temp: d.main.temp,
        icon: d.weather[0].icon,
      };
    });

  const list_hourly = list?.slice(0, 5).map((d: any) => {
    return {
      title: formatToLocalTime(d.dt, userTimezone, 'HH:mm'),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, list_daily, list_hourly };
};

const getFormattedWeatherData = async (searchParams: any) => {
  const formattedCurrentWeather = await getWeatherData(
    'weather',
    searchParams,
  ).then(formatCurrentWeather);

  let lat: any;
  let lon: any;

  try {
    ({ lat, lon } = formattedCurrentWeather);
  } catch (error) {
    throw error;
  }

  const formattedForecastWeather = await getWeatherData('forecast', {
    lat,
    lon,
    exclude: 'current,minutely,alerts',
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs: any,
  zone: string,
  format = "cccc, dd MMMM yyyy' | Time 'HH:mm",
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code: any) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
