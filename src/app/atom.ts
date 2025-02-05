import { atom } from "jotai";

export const placeAtom = atom("tehran");
export const weatherApiAtom = atom((get) => {
  const city = get(placeAtom);
  return {
    weatherApiToDay: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=9`,
    weatherApiWeek: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`,
  };
});

export const loadingCityAtom = atom(false)