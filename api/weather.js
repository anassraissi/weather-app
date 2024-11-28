import axios from 'axios'
import { apiKey } from '../constants'

const forecastEndpoint=params=>`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint=params=>`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

    const apiCall=async(endpoint)=>{
        const option={
            method:'GET',
            url:endpoint
        }
        try{
            const response=await axios.request(option);
            return response.data;
        }
        catch(err){
                console.log('error',err);
                return null  
        }
    }

    export const fetchWeatherForecast=params=>{
        return apiCall(forecastEndpoint(params))
    }
    export const fetchLocation=params=>{
        return apiCall(locationsEndpoint(params))
    }


