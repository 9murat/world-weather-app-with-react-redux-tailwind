import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherData } from '../redux/slices/weatherSlice';
import { GiWindsock } from 'react-icons/gi';

export default function WeatherList() {
    const { weatherData } = useSelector(state => state.weather);
    const [curentCity, setCurentCity] = useState('Ankara');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getWeatherData(curentCity))
    }, [dispatch, curentCity])

    return (
        <div className='text-black font-semibold bg-green-600   rounded-md w-1/2   justify-center items-center '>
            <input className='border-8px mt-4 rounded-md bg-gray-200 text-black' placeholder=' Search a city' type="text" onChange={(e) => setCurentCity(e.target.value)} />
            <div>


                {
                    // If the value to be mapped is an object and you want to send its properties to the user,
                    // you can directly get the properties of the object and use it. You don't need the .map() function for this.


                    // Before sending all incoming values ​​to the user, definitely check the type and whether the incoming value is null.

                    weatherData && (
                        <div>
                            <div className='mt-4 text-2xl font-semibold'> {weatherData.name}</div>
                            <div className='flex justify-between mr-10 ml-10 mt-4 mb-4'>
                                {weatherData.weather && weatherData.weather.length > 0 && (
                                    // The weather property is treated as an array and takes icon and description from [0]
                                    <div>
                                        <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
                                        <div > {weatherData.weather[0].description}</div>
                                    </div>
                                )}

                                {weatherData.main && (
                                    <div>
                                        <div>Temperature : {weatherData.main.temp} °C</div>
                                        <div>Felt Temperature : {weatherData.main.feels_like} °C</div>
                                        <div>Humidity : % {weatherData.main.humidity}</div>
                                    </div>
                                )}
                                {weatherData.wind && (
                                    <div className='flex justify-between'>
                                        <div className='mr-3'>Wind Speed : {weatherData.wind.speed} kmph</div>
                                        <GiWindsock />
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}



