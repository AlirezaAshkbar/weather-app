"use client"
import { useState, useEffect } from "react";
import { format, fromUnixTime, parseISO } from "date-fns";
import Navbar from "./components/Navbar";
import TodayData from "./components/TodayData";
import WeekForcast from "./components/WeekForcast";
import useFetch from "./hooks/useFetch";
import { WeatherApiResponse, WeatherData } from "./Props/weatherProps";
import { metersToKilometers } from "./utils/metersToKilometers";
import getDayOrNightIcon from "./utils/getDayOrNightIcon";
import { convertWindSpeed } from "./utils/convertWindSpeed";
import { loadingCityAtom, weatherApiAtom } from "./atom";
import { useAtomValue } from "jotai";
import SkeletonLoading from "./components/SkeletonLoading";
import Error from "./components/Error";

export default function Home() {
  const weatherApi = useAtomValue(weatherApiAtom);
  const loadingCity = useAtomValue(loadingCityAtom);
  const { data, error } = useFetch<WeatherApiResponse>(weatherApi.weatherApiWeek);
  const [firstDataForEachDate, setFirstDataForEachDate] = useState<(WeatherData | undefined)[]>([]); // Updated type

  // Compute first data for each unique date
  useEffect(() => {
    if (!data) return;

    const uniqDates = [
      ...new Set(
        data.list.map(
          (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
        )
      ),
    ];

    const filteredData = uniqDates.map((date) => {
      return data.list.find((entry) => {
        const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
        const entryTime = new Date(entry.dt * 1000).getHours();
        return entryDate === date && entryTime >= 6;
      });
    });

    setFirstDataForEachDate(filteredData);
  }, [data]);

  if (error) return <Error message={error.message} />;


  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb10 pt-4">
        {loadingCity ? (
          <SkeletonLoading />
        ) : (
          <>
            <TodayData api={weatherApi.weatherApiToDay} />
            <p className="text-2xl">Forcast (7 days)</p>
            <span>
              {firstDataForEachDate
                .filter((d): d is WeatherData => d !== undefined) 
                .map((d, i) => (
                  <WeekForcast
                    key={i}
                    description={d?.weather[0].description ?? ""}
                    weatherIcon={getDayOrNightIcon(
                      d?.weather[0].icon ?? "",
                      d?.dt_txt ?? ""
                    )}
                    date={
                      d?.dt_txt ? format(parseISO(d?.dt_txt ?? ""), "dd.MM") : ""
                    }
                    day={d?.dt_txt ? format(parseISO(d?.dt_txt ?? ""), "EEEE") : ""}
                    feels_like={d?.main.feels_like ?? 0}
                    temp={d?.main.temp ?? 0}
                    temp_max={d?.main.temp_max ?? 0}
                    temp_min={d?.main.temp_min ?? 0}
                    airPressure={`${d?.main.pressure}hPa`}
                    humidity={`${d?.main.humidity}%`}
                    sunrise={format(
                      fromUnixTime(data?.city.sunrise ?? 0),
                      "H:mm"
                    )}
                    sunset={format(
                      fromUnixTime(data?.city.sunset ?? 0),
                      "H:mm"
                    )}
                    visability={`${metersToKilometers(d?.visibility ?? 0)}`}
                    windSpeed={`${convertWindSpeed(d?.wind.speed ?? 0)}`}
                  />
                ))}
            </span>
          </>
        )}
      </main>
    </div>
  );
}
