import React from 'react';
import { formatToLocalTime } from '@/lib/openWeather';

type Props = {
  weather: any;
};

function TimeLocation({ weather: { dt, name, country } }: Props) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div>
      <div className='flex items-center justify-center my-6'>
        <p className='text-xl font-extralight'>
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
