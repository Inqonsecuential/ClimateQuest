import React from 'react';
import TimeDisplay from '@/components/dateTime';

type Props = {
  weather: any;
};

function TimeLocation({ weather: { name, country, lat, lon } }: Props) {
  return (
    <div className=''>
      <div className='flex items-center justify-center my-3'>
        <div className='text-3xl font-medium'>{`${name}, ${country}`}</div>
      </div>
      <div className='flex flex-col items-center justify-center text-center'>
        <div className='text-xs mb-2'>{name} - Local Time</div>
        <div className='text-base md:text-xl font-normal'>
          <TimeDisplay lat={lat} lon={lon} />
        </div>
      </div>
    </div>
  );
}

export default TimeLocation;
