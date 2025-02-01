import React from "react";
import Container from "./Container";
import useFetch from "../hooks/useFetch";
import { format, parseISO } from "date-fns";
import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";
import { WeatherApiResponse } from "../Props/weatherProps";
import WeatherIcon from "./WeatherIcon";

type Props = { api: string };

function TodayData({ api }: Props) {
  const { data } = useFetch<WeatherApiResponse>(api);
  const firstData = data?.list[0];

  return (
    <div className="space-y-4">
      <h2 className="flex gap-1 text-2xl items-end">
        <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
      </h2>
      <Container className="gap-10 px-6">
        {/* temprature */}

        <div className="flex flex-col px-4 font-semibold">
          <span className="text-5xl">
            {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
          </span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>
              {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
            </span>
            <span className="text-xs space-x-4 ">
              <span>
                {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
              </span>
              <span>
                {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
              </span>
            </span>
          </p>
        </div>
        {/* time and icons */}
        <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
          {data?.list.map((d, i) => (
            <div
              key={i}
              className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
            >
              <p>{format(parseISO(d.dt_txt), "h:mm a")}</p>
              <WeatherIcon iconName={d.weather[0].icon} />
              <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default TodayData;
