import React from "react";
import Container from "./Container";
import useFetch from "../hooks/useFetch";
import { format, fromUnixTime, parseISO } from "date-fns";
import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";
import { WeatherApiResponse } from "../Props/weatherProps";
import WeatherIcon from "./WeatherIcon";
import getDayOrNightIcon from "../utils/getDayOrNightIcon";
import WeatherDetails from "./WeatherDetails";
import { metersToKilometers } from "../utils/metersToKilometers";
import { convertWindSpeed } from "../utils/convertWindSpeed";
import SkeletonLoading from "./SkeletonLoading";

type Props = { api: string };

function TodayData({ api }: Props) {
  const { data, isPending } = useFetch<WeatherApiResponse>(api);
  const firstData = data?.list[0];
  if (isPending) {
    return <SkeletonLoading />;
  }

  return (
    <div className="space-y-4">
      <h2 className="flex gap-1 text-2xl items-center">
        <p>
          {firstData?.dt_txt
            ? format(parseISO(firstData.dt_txt), "EEEE")
            : "N/A"}
        </p>
      </h2>
      <Container className="gap-10 px-6">
        {/* temprature */}

        <div className="flex flex-col px-4 font-semibold justify-center ">
          <span className="text-6xl pl-4">
            {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
          </span>
          <div className=" space-x-1 whitespace-nowrap text-gray-700">
            <p>
              Feels like
              <span>
                {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
              </span>
            </p>
            <div className="text-sm flex justify-between ">
              <span>
                {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
              </span>
              <span>
                {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
              </span>
            </div>
          </div>
        </div>
        {/* time and icons */}
        <div className="flex  gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3 custom-scrollbar">
          {data?.list.map((d, i) => (
            <div key={i} className="flex flex-col items-center  font-semibold">
              <p>{format(parseISO(d.dt_txt), "h:mm a")}</p>
              <WeatherIcon
                iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
              />
              <p className="pb-1">
                {convertKelvinToCelsius(d?.main.temp ?? 0)}°
              </p>
            </div>
          ))}
        </div>
      </Container>
      <div className="flex gap-4 ">
        {/* left */}
        <Container className="w-fit justify-center flex-col px-8 items-center ">
          {" "}
          <p className="capitalize text-center font-semibold text-nowrap ">
            {firstData?.weather[0].description}
          </p>
          <WeatherIcon
            iconName={getDayOrNightIcon(
              firstData?.weather[0].icon ?? "",
              firstData?.dt_txt ?? ""
            )}
          />
        </Container>
        {/* right */}
        <Container className="bg-yellow-300/85 px-6 gap-4 justify-between overflow-x-auto p-6 custom-scrollbar">
          <WeatherDetails
            visability={metersToKilometers(firstData?.visibility ?? 10000)}
            humidity={`${firstData?.main.humidity}%`}
            windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)}
            airPressure={`${firstData?.main.pressure} hPa`}
            sunrise={`${format(fromUnixTime(data?.city.sunrise ?? 0), "H:mm")}`}
            sunset={`${format(fromUnixTime(data?.city.sunset ?? 0), "H:mm")}`}
          />{" "}
        </Container>
      </div>
    </div>
  );
}

export default TodayData;
