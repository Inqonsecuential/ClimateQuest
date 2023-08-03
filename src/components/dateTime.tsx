import React, { useState, useEffect } from 'react';

interface TimeProps {
  lat: number;
  lon: number;
}

const TimeDisplay: React.FC<TimeProps> = ({ lat, lon }) => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    fetchDateTime();
  }, [lat, lon]);

  const fetchDateTime = async () => {
    try {
      const response = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=WQKBHFLHBKR3&format=json&by=position&lat=${lat}&lng=${lon}`,
      );

      if (response.ok) {
        const data = await response.json();
        const currentTime = new Date(data.formatted);
        setDate(formatDate(currentTime));
        setTime(formatTime(currentTime));
      } else {
        // Handle error here, e.g., setError(errorMessage);
      }
    } catch (error) {
      // Handle error here, e.g., setError(errorMessage);
    }
  };
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div>
      {date && time ? (
        <p>
          {date} | {time}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TimeDisplay;
