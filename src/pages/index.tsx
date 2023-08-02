import Forecast from '@/components/forecast';
import Inputs from '@/components/input';
import TempDetails from '@/components/tempDetails';
import TimeLocation from '@/components/timeLocation';
import getFormattedWeatherData from '@/lib/openWeather';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface WeatherData {
  timezone: any;
  list_daily: any;
  list_hourly: any;
  lat: any;
  lon: any;
  temp: any;
  feels_like: any;
  temp_min: any;
  temp_max: any;
  humidity: any;
  name: any;
  dt: any;
  country: any;
  sunrise: any;
  sunset: any;
  details: any;
  icon: any;
  speed: any;
}

export default function Home() {
  const [query, setQuery] = useState({ q: 'Bengaluru' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.';
      toast.info('Fetching weather for ' + message);
      try {
        await getFormattedWeatherData({ ...query, units }).then((data) => {
          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}.`,
          );

          setWeather(data);
        });
      } catch {
        toast.error('City name invalid');
      }
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div
      className={`mx-auto max-w-screen h-screen py-5 flex justify-center bg-gradient-to-br shadow-xl shadow-gray-400 font-nunito`}
    >
      <div className='max-w-[50rem] flex flex-col justify-center mb-10'>
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeLocation weather={weather} />
            <TempDetails
              weather={weather}
              speedUnit={units === 'metric' ? 'm/s' : 'mph'}
              tempUnit={units === 'metric' ? 'C' : 'F'}
            />

            <Forecast title='hourly forecast' items={weather.list_hourly} />
            <Forecast title='daily forecast' items={weather.list_daily} />
          </div>
        )}
      </div>

      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />
    </div>
  );
}
