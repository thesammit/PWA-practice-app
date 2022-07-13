import axios from 'axios';
import { Weather } from '../types/weather';

const URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (query: string): Promise<Weather> => {
    console.log(process.env)
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: `${process.env.REACT_APP_API_KEY}`,
        }
    });
    return data;
}