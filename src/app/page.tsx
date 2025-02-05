"use client";

import { format, fromUnixTime, parseISO } from "date-fns";
import Navbar from "./components/Navbar";
import TodayData from "./components/TodayData";
import WeekForcast from "./components/WeekForcast";
import useFetch from "./hooks/useFetch";
import { WeatherApiResponse } from "./Props/weatherProps";
import { metersToKilometers } from "./utils/metersToKilometers";
import getDayOrNightIcon from "./utils/getDayOrNightIcon";
import { convertWindSpeed } from "./utils/convertWindSpeed";
import { useEffect, useState } from "react";
import { loadingCityAtom, placeAtom, weatherApiAtom } from "./atom";
import { useAtom } from "jotai";
import SkeletonLoading from "./components/SkeletonLoading";

export default function Home() {
  const [weatherApi] = useAtom(weatherApiAtom);
  const { data, isPending, refetch } = useFetch<WeatherApiResponse>(
    weatherApi.weatherApiWeek
  );
  const firstData = data?.list[0];
  const [place] = useState(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  console.log(place);
  useEffect(() => {
    refetch();
  }, [place]);

  const uniqDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];
  const firstDataForEachDate = uniqDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  console.log(data);
  console.log(firstData);
  if (isPending)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  return (
    <>
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <Navbar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb10 pt-4">
          {/* to day data */}
          {loadingCity ? (
            <SkeletonLoading />
          ) : (
            
            <>
              <TodayData api={weatherApi.weatherApiToDay} />
              {/* 7 days forcast */}
              <p className="text-2xl">Forcast (7 days)</p>
              <span className="">
                {firstDataForEachDate.map(
                  (d, i) =>
                    i > -1 && (
                      <WeekForcast
                        key={i}
                        description={d?.weather[0].description ?? ""}
                        weatherIcon={getDayOrNightIcon(
                          d?.weather[0].icon ?? "",
                          d?.dt_txt ?? ""
                        )}
                        date={
                          d?.dt_txt
                            ? format(parseISO(d?.dt_txt ?? ""), "dd.MM")
                            : ""
                        }
                        day={
                          d?.dt_txt
                            ? format(parseISO(d?.dt_txt ?? ""), "EEEE")
                            : ""
                        }
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
                    )
                )}
              </span>
            </>
          )}
        </main>
      </div>
    </>
  );
}
