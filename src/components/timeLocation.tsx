import React from 'react';
import { formatToLocalTime } from '@/lib/openWeather';

type Props = {
  weather: any;
};

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function TimeLocation({ weather: { dt, name, country } }: Props) {
  return (
    <div>
      <div className='flex items-center justify-center text-center my-6'>
        <p className='text-base md:text-xl font-normal'>
          {formatToLocalTime(dt, userTimezone)}
        </p>
      </div>

      <div className='flex items-center justify-center my-3'>
        <p className='text-3xl font-medium'>{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeLocation;
