import { useAtom } from "jotai";
import { placeAtom } from "../atom";

const useWeatherApi = () => {
  const [place] = useAtom(placeAtom);

  const weatherApiToDay = place
    ? `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=9`
    : '';

  const weatherApiWeek = place
    ? `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
    : '';

  return { weatherApiToDay, weatherApiWeek };
};

export default useWeatherApi;
