import Image from 'next/image';
import React from 'react';
import { GiWaterDrop } from 'react-icons/gi';
import { BiSolidNavigation } from 'react-icons/bi';
import { TbArrowDown, TbArrowUp, TbTemperature } from 'react-icons/tb';
import { TiWeatherWindy } from 'react-icons/ti';
import { iconUrlFromCode } from '@/lib/openWeather';

type Props = {
  weather: any;
  speedUnit: string;
  tempUnit: string;
};

function TempDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    speed,
    deg,
    humidity,
    feels_like,
  },
  speedUnit,
  tempUnit,
}: Props) {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  const index = Math.round(deg / 22.5) % 16;
  const direction = directions[index];
  return (
    <div>
      <div className='flex items-center justify-center py-6 text-xl text-cyan-900 font-bold underline dark:text-cyan-200'>
        <p>{details}</p>
      </div>

      <div className='flex flex-row items-center justify-between py-3'>
        <div className='flex items-center justify-center flex-row'>
          <Image
            src={iconUrlFromCode(icon)}
            width={500}
            height={500}
            alt='main weather icon'
            className='w-20 shadow-2xl drop-shadow-2xl rounded-full bg-gray-500 dark:bg-neutral-600'
          />
          <p className='text-5xl ml-6'>
            {`${temp.toFixed()}`} <span className='text-xl'>°{tempUnit}</span>
          </p>
        </div>
        <div className='flex flex-col space-y-2 justify-center'>
          <div className='flex font-light text-sm items-center'>
            <TbTemperature size={18} className='mr-1' />
            Feels Like:
            <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className='flex font-light text-sm items-center'>
            <GiWaterDrop size={18} className='mr-1' />
            Humidity:
            <span className='font-medium ml-1'>{`${humidity}%`}</span>
          </div>
          <div className='flex font-light text-sm items-center'>
            <TiWeatherWindy size={18} className='mr-1' />
            Wind:
            <span className='font-medium ml-1'>{`${speed} ${speedUnit}`}</span>
          </div>
          <div className='flex font-light text-sm items-center'>
            <BiSolidNavigation size={18} className='mr-1 ' />
            Direction:
            <span className='font-medium ml-1'>{direction}</span>
          </div>
          <div className='flex font-light text-sm items-center'>
            <TbArrowUp size={18} className='mr-1' />
            <p className='font-light'>
              High:{' '}
              <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
            </p>
          </div>
          <div className='flex font-light text-sm items-center'>
            <TbArrowDown size={18} className='mr-1' />
            <p className='font-light'>
              Low:{' '}
              <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center space-x-2 text-sm py-3'></div>
    </div>
  );
}

export default TempDetails;
