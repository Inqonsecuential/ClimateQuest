import React from 'react';

const date = new Date();

const formattedDate = date.toLocaleString('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const formattedTime = date.toLocaleString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
});

const formattedDateTime = `${formattedDate} | ${formattedTime}`;

type Props = {
  weather: any;
};

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function TimeLocation({ weather: { dt, name, country } }: Props) {
  return (
    <div>
      <div className='flex items-center justify-center text-center my-6'>
        <p className='text-base md:text-xl font-normal'>{formattedDateTime}</p>
      </div>

      <div className='flex items-center justify-center my-3'>
        <p className='text-3xl font-medium'>{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeLocation;
