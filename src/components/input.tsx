import React, { useState } from 'react';
import { BiCurrentLocation, BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';

type Props = {
  setQuery: any;
  units: any;
  setUnits: any;
};

function Input({ setQuery, units, setUnits }: Props) {
  const [city, setCity] = useState('');

  const handleUnitsChange = (e: any) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city });
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching users location.');
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched!');
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className='flex flex-row justify-center items-center my-6 max-w-[50rem]'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyPress={handleKeyPress}
          type='text'
          placeholder='Search'
          className='w-full px-4 py-2 text-xl placeholder-gray-400 border rounded-lg shadow-xl focus:outline-none focus:border-transparent'
        />
        <BiSearch
          size={25}
          className='cursor-pointer transition ease-out hover:scale-125'
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          size={25}
          className='cursor-pointer transition ease-out hover:scale-125'
          onClick={handleLocationClick}
        />
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button
          name='metric'
          className={`text-xl font-bold transition ease-out hover:scale-125 hover:text-gray-600 ${
            units === 'metric' ? 'text-red-400' : ''
          }`}
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className='text-xl mx-1'>/</p>
        <button
          name='imperial'
          className={`text-xl font-bold transition ease-out hover:scale-125 hover:text-gray-600 ${
            units === 'imperial' ? 'text-red-400' : ''
          }`}
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Input;
